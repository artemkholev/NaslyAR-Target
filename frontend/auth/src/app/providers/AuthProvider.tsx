import { AuthContext } from "@/shared/types/context";
import { useProvideAuth } from "@/features/auth";
import React, { ReactNode } from "react";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};
