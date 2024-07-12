import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
} from 'react';
import { API_URL } from '../config';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export function getSecureToken() {
  const tokens = localStorage.getItem('authTokens');
  if (tokens) {
    return JSON.parse(tokens).access;
  }
  return null;
}
export function secureLogout() {
  localStorage.removeItem('authTokens');
}

export const AuthProvider = ({ children }) => {
  const [authTokens, setAuthTokens] = useState(() => {
    const tokens = localStorage.getItem('authTokens');
    return tokens ? JSON.parse(tokens) : null;
  });

  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();
  const fetchUserData = useCallback(async () => {
    if (!authTokens) return;
    try {
      const response = await fetch(`${API_URL}/users/me/`, {
        headers: {
          Authorization: `Bearer ${getSecureToken()}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        console.log('User data:', data);
        setCurrentUser(data);
      } else {
        throw new Error('Unable to fetch user data.');
      }
    } catch (error) {
      console.error('Fetch user data failed:', error);
    }
  }, [authTokens]);

  useEffect(() => {
    fetchUserData();
  }, [authTokens]);

  // useEffect(() => {
  //   const tokens = localStorage.getItem('authTokens');
  //   if (tokens) {
  //     setAuthTokens(JSON.parse(tokens));
  //   }
  //   setLoading(false);

  //   const interval = setInterval(
  //     () => {
  //       if (authTokens) {
  //         refreshToken();
  //       }
  //     },
  //     15 * 60 * 1000
  //   ); // Refresh every 15 minutes

  //   return () => clearInterval(interval);
  // }, [refreshToken]);

  const refreshToken = useCallback(async () => {
    const tokens = JSON.parse(localStorage.getItem('authTokens'));
    if (tokens) {
      const response = await fetch(API_URL + '/users/token/refresh/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refresh: tokens.refresh }),
      });

      if (response.ok) {
        const data = await response.json();
        setAuthTokens(data);
        localStorage.setItem('authTokens', JSON.stringify(data));
      } else {
        logout();
      }
    }
  }, []);

  const login = async (email, password) => {
    const response = await fetch(API_URL + '/users/login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const data = await response.json();
      setAuthTokens(data);
      localStorage.setItem('authTokens', JSON.stringify(data));
      await fetchUserData();
      return data;
    } else {
      const errorData = await response.json();
      throw new Error(errorData.detail || 'Login failed');
    }
  };

  const logout = () => {
    setAuthTokens(null);
    setCurrentUser(null);
    localStorage.removeItem('authTokens');
    navigate('/login');
  };

  const getAuthToken = () => {
    if (authTokens) {
      return authTokens.access;
    }
    return null;
  };

  const contextValue = {
    authTokens,
    login,
    logout,
    getAuthToken,
    refreshToken,
    fetchUserData,
    currentUser,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export const refreshAccessToken = async () => {
  const tokens = JSON.parse(localStorage.getItem('authTokens'));
  if (tokens) {
    const response = await fetch(API_URL + '/users/token/refresh/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refresh: tokens.refresh }),
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem('authTokens', JSON.stringify(data));
      return true;
    } else {
      localStorage.removeItem('authTokens');
      return false;
    }
  }
  return false;
};
