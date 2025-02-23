import { createAsyncThunk } from "@reduxjs/toolkit";
import baseApi from "@/shared/api/auth";
import { setToken, removeToken } from "@/shared/lib/auth";

export const fetchUser = createAsyncThunk(
  "auth/fetchUser",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await baseApi.get("/auth/me"); // Adjust endpoint as needed
      return data; // Expected to contain user info
    } catch (error) {
      return rejectWithValue("Failed to fetch user information");
    }
  }
);

export const loginRequest = createAsyncThunk(
  "auth/login",
  async (credentials: { login: string; password: string }, { rejectWithValue }) => {
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

export const logoutRequest = createAsyncThunk("auth/logout", async () => {
  await baseApi.post("/auth/logout");
  removeToken();
});
