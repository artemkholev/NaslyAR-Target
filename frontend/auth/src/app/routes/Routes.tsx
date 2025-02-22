import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { LoginForm } from "@/widgets/login";
import { RegisterForm } from "@/widgets/register";
import { Dashboard } from "@/features/dashboard";
import { useAuth } from "@/shared/types/context";

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to='/login' />;
};

export const AppRoutes = () => (
  <Routes>
    <Route path='/login' element={<LoginForm />} />
    <Route path='/register' element={<RegisterForm />} />
    <Route
      path='/dashboard'
      element={
        <PrivateRoute>
          <Dashboard />
        </PrivateRoute>
      }
    />
    <Route path='*' element={<Navigate to='/dashboard' />} />
  </Routes>
);
