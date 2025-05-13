/// <reference types="react" />

declare module "host/useAuth" {
  export interface LoginCredentials {
    email: string;
    password: string;
  }

  export interface UseAuthReturn {
    accessToken: string | null;
    register: (email: string, password: string) => Promise<object>;
    login: (email: string, password: string) => Promise<object>;
    logout: () => Promise<object>;
    refreshToken: () => Promise<object>;
  }

  export function useAuth(): UseAuthReturn;
}
