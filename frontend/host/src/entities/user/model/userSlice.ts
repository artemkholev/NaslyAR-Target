import { createSlice } from "@reduxjs/toolkit";
import { fetchUser } from "../api";
import { User } from "../lib";

interface UserState {
  data: User | null;
  isAuthenticated: boolean; // Добавляем состояние авторизации
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  data: null,
  isAuthenticated: false, // По умолчанию пользователь не авторизован
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Редюсер для очистки данных пользователя
    clearUser: (state) => {
      state.data = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.data = action.payload;
        state.isAuthenticated = true; // Пользователь авторизован
        state.loading = false;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.error = action.payload as string;
        state.isAuthenticated = false; // Пользователь не авторизован
        state.loading = false;
      });
  },
});

export const { clearUser } = userSlice.actions; // Экспортируем редюсер для очистки данных
export default userSlice.reducer;