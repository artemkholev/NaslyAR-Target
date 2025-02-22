import React, { useState } from "react";
import { useAuth } from "@/shared/types/context";
import { useNavigate } from "react-router-dom";

export const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const fakeToken = "fake-jwt-token";
    login(fakeToken);
    navigate("/dashboard");
  };

  return (
    <form onSubmit={handleSubmit} className='p-4 max-w-md mx-auto'>
      <h2 className='text-xl font-semibold mb-4'>Вход</h2>
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder='Email'
        className='block w-full p-2 mb-2 border rounded'
        required
      />
      <input
        type='password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder='Пароль'
        className='block w-full p-2 mb-2 border rounded'
        required
      />
      <button type='submit' className='w-full bg-blue-500 text-white py-2 rounded'>
        Войти
      </button>
    </form>
  );
};
