import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/login");
  };

  return (
    <form onSubmit={handleSubmit} className='p-4 max-w-md mx-auto'>
      <h2 className='text-xl font-semibold mb-4'>Регистрация</h2>
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
      <button type='submit' className='w-full bg-green-500 text-white py-2 rounded'>
        Зарегистрироваться
      </button>
    </form>
  );
};
