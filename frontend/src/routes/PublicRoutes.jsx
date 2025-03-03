import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PublicRoutes = ({ isAuthenticated }) => {
  return !isAuthenticated ? <Outlet /> : <Navigate to="/user/dashboard/" />;
};

export default PublicRoutes;
