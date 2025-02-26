/// <reference types="react" />

declare module "host/useAuth" {
  export interface LoginCredentials {
    login: string;
    password: string;
  }

  export interface UseAuthReturn {
    accessToken: string | null;
    login: (login: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    refreshToken: () => Promise<void>;
  }

  export function useAuth(): UseAuthReturn;
}
