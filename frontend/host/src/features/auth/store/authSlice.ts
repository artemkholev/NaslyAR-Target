import { createSlice } from "@reduxjs/toolkit";
import { loginRequest, refreshTokenRequest, logoutRequest } from "../api";

interface AuthState {
  accessToken: string | null;
}

const initialState: AuthState = {
  accessToken: localStorage.getItem("accessToken") ?? null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginRequest.fulfilled, (state, action) => {
        state.accessToken = action.payload.accessToken;
      })
      .addCase(refreshTokenRequest.fulfilled, (state, action) => {
        state.accessToken = action.payload.accessToken;
      })
      .addCase(logoutRequest.fulfilled, (state) => {
        state.accessToken = null;
      });
  },
});

export default authSlice.reducer;
