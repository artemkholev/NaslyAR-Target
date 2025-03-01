import { createSlice } from "@reduxjs/toolkit";
import { fetchUser, loginRequest, refreshTokenRequest, logoutRequest } from "../api";

interface User {
  id: string;
  username: string;
  email: string;
}

interface AuthState {
  accessToken: string | null;
  user: User | null;
}

const initialState: AuthState = {
  accessToken: localStorage.getItem("accessToken") ?? null,
  user: null,
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
        state.user = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.user = action.payload;
      });
  },
});

export default authSlice.reducer;
