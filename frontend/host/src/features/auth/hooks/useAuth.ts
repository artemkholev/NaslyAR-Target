import { useSelector, useDispatch } from "react-redux";
import { loginRequest, logoutRequest, refreshTokenRequest } from "../api";
import { RootState, AppDispatch } from "@/app/store";

export const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);

  const login = (login: string, password: string) =>
    dispatch(loginRequest({ login, password })).unwrap();
  const logout = () => dispatch(logoutRequest()).unwrap();
  const refreshToken = () => dispatch(refreshTokenRequest()).unwrap();

  return { accessToken, login, logout, refreshToken };
};
