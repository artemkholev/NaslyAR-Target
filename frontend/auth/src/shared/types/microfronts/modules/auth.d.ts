/// <reference types="react" />

declare module "host/useAuth" {
  export interface LoginCredentials {
    email: string;
    password: string;
  }

  export interface UseAuthReturn {
    accessToken: string | null;
    register: (email: string, password: string) => Promise<void>;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    refreshToken: () => Promise<void>;
  }

  export function useAuth(): UseAuthReturn;
}
