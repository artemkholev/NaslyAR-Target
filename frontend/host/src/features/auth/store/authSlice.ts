import { createSlice } from "@reduxjs/toolkit";
import { getToken } from "@/shared/lib/auth";
import { loginRequest, refreshTokenRequest, logoutRequest, registerRequest } from "../api";

interface AuthState {
  accessToken: string | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  accessToken: getToken() ?? null,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginRequest.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginRequest.fulfilled, (state, action) => {
        state.accessToken = action.payload.accessToken;
        state.isLoading = false;
      })
      .addCase(loginRequest.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(registerRequest.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerRequest.fulfilled, (state, action) => {
        state.accessToken = action.payload.accessToken;
        state.isLoading = false;
      })
      .addCase(registerRequest.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(refreshTokenRequest.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(refreshTokenRequest.fulfilled, (state, action) => {
        state.accessToken = action.payload.accessToken;
        state.isLoading = false;
      })
      .addCase(refreshTokenRequest.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(logoutRequest.fulfilled, (state) => {
        state.accessToken = null;
      });
  },
});

export default authSlice.reducer;
