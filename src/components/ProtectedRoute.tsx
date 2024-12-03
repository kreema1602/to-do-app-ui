import React from "react";
import { Navigate, RouteProps } from "react-router-dom";

// Define a ProtectedRoute component
interface ProtectedRouteProps extends RouteProps {
  isAuthenticated: boolean;
  redirectTo: string;
  element: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  isAuthenticated,
  redirectTo,
  element,
}) => {
  // If the user is authenticated, show the protected element (route)
  // Otherwise, redirect to the login page or another route
  return isAuthenticated ? <>{element}</> : <Navigate to={redirectTo} />;
};

export default ProtectedRoute;
