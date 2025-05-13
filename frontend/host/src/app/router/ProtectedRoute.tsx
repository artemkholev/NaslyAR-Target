import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "@/entities/user";

export const ProtectedRoute = () => {
  const { isAuthenticated } = useUser();

  if (!isAuthenticated) {
    return <Navigate to='/auth' replace />;
  }

  return <Outlet />;
};