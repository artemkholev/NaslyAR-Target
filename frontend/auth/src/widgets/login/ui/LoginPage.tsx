import { useAuth } from "@/features/auth/hooks/useAuth";
import React, { useState } from "react";

export const LoginPage = () => {
  const { login, loading, error } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login({ username, password });
  };

  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <form onSubmit={handleSubmit} className='w-96 p-6 bg-white shadow-lg rounded-2xl'>
        <h2 className='text-xl font-semibold mb-4 text-center'>Вход</h2>
        <input
          type='text'
          placeholder='Логин'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className='w-full p-2 border rounded mb-4'
        />
        <input
          type='password'
          placeholder='Пароль'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className='w-full p-2 border rounded mb-4'
        />
        {error && <p className='text-red-500 text-sm mb-2'>{error}</p>}
        <button
          type='submit'
          disabled={loading}
          className='w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600'>
          {loading ? "Загрузка..." : "Войти"}
        </button>
      </form>
    </div>
  );
};
