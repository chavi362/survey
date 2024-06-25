import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const PrivateRoute = ({ element: Component, ...rest }) => {
  const token = Cookies.get('token');
  return (
    <Route
      {...rest}
      element={token ? Component : <Navigate to="/login" />}
    />
  );
};

export default PrivateRoute;
