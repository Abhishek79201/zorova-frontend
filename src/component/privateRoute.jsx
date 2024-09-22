import React from 'react';
import { Route, useNavigate } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const authToken = localStorage.getItem('auth_token');
  const navigate = useNavigate();

  if (!authToken) {
    navigate('/login');
    return null; // Return null or a loading component while the redirect happens
  }

  return <Route {...rest} element={<Component />} />;
};

export default PrivateRoute;
