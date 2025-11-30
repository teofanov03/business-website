import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../utils/AuthContext";

interface PrivateRouteProps {
  Component: React.FC;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ Component }) => {
  const { isAuthenticated, loading } = useContext(AuthContext);
// console.log("PrivateRoute isAuthenticated:", isAuthenticated, "loading:", loading);
  if (loading) return <div>Loading...</div>; 
  return isAuthenticated ? <Component /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
