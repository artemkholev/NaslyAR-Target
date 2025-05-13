import { useSelector, useDispatch } from "react-redux";
import { fetchUser } from "../api";
import { RootState, AppDispatch } from "@/app/store";
import { clearUser } from "../model";

export const useUser = () => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.user.data);
  const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated);

  // Загрузка данных пользователя
  const getUser = async () => {
    try {
      await dispatch(fetchUser()).unwrap();
    } catch (error) {
      console.error("Failed to fetch user:", error);
    }
  };

  // Очистка данных пользователя
  const clearUserData = () => {
    dispatch(clearUser());
  };

  return { user, isAuthenticated, getUser, clearUserData };
};
