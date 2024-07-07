import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../providers/authProvider';

const PrivateRoute = ({ children }) => {
  const { authTokens } = useAuth();

  return authTokens ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
