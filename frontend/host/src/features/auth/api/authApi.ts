import { createAsyncThunk } from "@reduxjs/toolkit";
import baseApi from "@/shared/api/requests";
import { clearUser } from "@/entities/user";
import { removeToken, setToken } from "@/shared/lib/auth";

export const registerRequest = createAsyncThunk(
  "auth/register",
  async (credentials: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const { data } = await baseApi.post("/auth/register", credentials);
      setToken(data.access_token);
      return { accessToken: data.access_token };
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
      return { accessToken: data.access_token };
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
      setToken(data.access_token);
      return { accessToken: data.access_token };
    } catch {
      return rejectWithValue("Ошибка обновления токена");
    }
  }
);

export const logoutRequest = createAsyncThunk(
  "auth/logout",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const responce = await baseApi.post("/auth/logout");
      removeToken();
      dispatch(clearUser());
      return responce.data;
    } catch {
      return rejectWithValue("Ошибка выхода из приложения");
    }
  }
);
