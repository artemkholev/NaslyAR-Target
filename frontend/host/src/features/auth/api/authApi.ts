import { createAsyncThunk } from "@reduxjs/toolkit";
import baseApi from "@/shared/api/requests";
import { setToken, removeToken } from "@/shared/lib/auth";
import { clearUser } from "@/entities/user";

export const registerRequest = createAsyncThunk(
  "auth/register",
  async (credentials: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const { data } = await baseApi.post("/auth/register", credentials);
      setToken(data.accessToken);
      return { accessToken: data.accessToken };
    } catch {
      return rejectWithValue("Ошибка регистрации");
    }
  }
);

export const loginRequest = createAsyncThunk(
  "auth/login",
  async (credentials: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const { data } = await baseApi.post("/auth/login", credentials);
      setToken(data.accessToken);
      return { accessToken: data.accessToken };
    } catch {
      return rejectWithValue("Ошибка входа");
    }
  }
);

export const refreshTokenRequest = createAsyncThunk(
  "auth/refreshToken",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await baseApi.post("/auth/refresh");
      setToken(data.accessToken);
      return { accessToken: data.accessToken };
    } catch {
      return rejectWithValue("Ошибка обновления токена");
    }
  }
);

export const logoutRequest = createAsyncThunk("auth/logout", async (_, { dispatch }) => {
  await baseApi.post("/auth/logout");
  removeToken();
  dispatch(clearUser()); // Очищаем данные пользователя
});

