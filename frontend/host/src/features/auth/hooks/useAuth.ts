import { useSelector, useDispatch } from "react-redux";
import { registerRequest, loginRequest, logoutRequest, refreshTokenRequest } from "../api";
import { RootState, AppDispatch } from "@/app/store";

export const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);

  const register = (email: string, password: string) =>
    dispatch(registerRequest({ email, password })).unwrap();
  const login = (email: string, password: string) =>
    dispatch(loginRequest({ email, password })).unwrap();
  const logout = () => dispatch(logoutRequest()).unwrap();
  const refreshToken = () => dispatch(refreshTokenRequest()).unwrap();

  return { accessToken, register, login, logout, refreshToken };
};