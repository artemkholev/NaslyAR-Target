import { createAsyncThunk } from "@reduxjs/toolkit";
import baseApi from "@/shared/api/requests";
import { User } from "../lib";

export const fetchUser = createAsyncThunk(
  "user/fetchUser",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await baseApi.get<User>("/auth/me");
      return data;
    } catch (error) {
      return rejectWithValue("Failed to fetch user information");
    }
  }
);