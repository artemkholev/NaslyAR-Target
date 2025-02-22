import React from "react";
import { useAuth } from "@/shared/types/context";
import { useNavigate } from "react-router-dom";

export const Dashboard = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className='p-4'>
      <h1 className='text-2xl font-bold mb-4'>Добро пожаловать в Панель!</h1>
      <button
        onClick={() => {
          logout();
          navigate("/login");
        }}
        className='bg-red-500 text-white py-2 px-4 rounded'>
        Выйти
      </button>
    </div>
  );
};
