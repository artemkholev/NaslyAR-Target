import { AppDispatch } from "@/app/store";
import React, { ReactNode, useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchUser } from "@/features/auth";

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      dispatch(fetchUser());
    }
  }, [dispatch]);

  return <>{children}</>;
};

export default AuthProvider;
