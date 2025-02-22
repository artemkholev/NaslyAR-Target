import { useState, useEffect } from "react";
import { getToken, setToken, removeToken } from "@/shared/lib/auth";
import { AuthContextType } from "@/shared/types/auth";

export const useProvideAuth = (): AuthContextType => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!getToken());

  const login = (token: string) => {
    setToken(token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    removeToken();
    setIsAuthenticated(false);
  };

  useEffect(() => {
    if (getToken()) setIsAuthenticated(true);
  }, []);

  return { isAuthenticated, login, logout };
};
