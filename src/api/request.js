import { getSecureToken, secureLogout } from '../providers/authProvider';
import { refreshAccessToken } from '../providers/authProvider';

async function apiRequest(url, method, data = null, headers = {}) {
  const token = getSecureToken();

  const options = {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }), // Agrega el token al encabezado si está presente
      ...headers,
    },
  };

  if (data) {
    options.body = JSON.stringify(data);
  }

  try {
    let response = await fetch(url, options);
    if (response.status === 401) {
      // Try to refresh token if access token is expired
      const refreshResult = await refreshAccessToken();
      if (refreshResult) {
        // Retry the original request with new token
        const newToken = getSecureToken();
        options.headers.Authorization = `Bearer ${newToken}`;
        response = await fetch(url, options);
      } else {
        // If refresh also fails, log out the user
        secureLogout();
        window.location.href = '/login'; // Redirect to login page
        return { error: 'Token refresh failed. Please login again.' };
      }
    }

    if (response.status === 204) {
      return { status: response.status }; // Properly handle no content
    }

    if (!response.ok) {
      try {
        const errorData = await response.json();
        console.log('Server error data:', errorData);
        return { error: errorData };
      } catch (jsonError) {
        console.error('Error parsing JSON from response:', jsonError);
        return {
          error: { message: 'Server returned non-JSON error response' },
        };
      }
    }

    // Parse the response as JSON only if the response is OK and not empty
    return await response.json();
  } catch (error) {
    console.error('API request error:', error);
    throw error;
  }
}

export default apiRequest;
