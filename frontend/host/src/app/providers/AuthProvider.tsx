import { useEffect } from "react";
import { useAuth } from "@/features/auth";
import { useUser } from "@/entities/user";
import React from "react";

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const { accessToken } = useAuth();
  const { user, getUser } = useUser();

  useEffect(() => {
    if (accessToken && !user) {
      getUser().catch((error) => {
        console.error("Ошибка при загрузке данных пользователя:", error);
      });
    }
  }, [accessToken, user, getUser]);

  return <>{children}</>;
};

export default AuthProvider;
