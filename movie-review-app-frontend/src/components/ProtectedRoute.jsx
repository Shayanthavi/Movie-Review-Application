import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true'; // Check authentication state

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />; // Redirect to login if not authenticated
  }

  return children; // Render the protected component
};

export default ProtectedRoute;