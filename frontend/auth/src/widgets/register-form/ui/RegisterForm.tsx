import React, { useState } from "react";

export const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Пароли не совпадают");
      return;
    }
    console.log("Register with:", { email, password });
  };

  return (
    <form onSubmit={handleSubmit} className='flex flex-col gap-[8px] w-full'>
      <input
        type='email'
        placeholder='Email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className='border p-2 rounded-xl w-full'
        required
      />
      <input
        type='password'
        placeholder='Пароль'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className='border p-2 rounded-xl w-full'
        required
      />
      <input
        type='password'
        placeholder='Подтвердите пароль'
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        className='border p-2 rounded-xl w-full'
        required
      />
      <button type='submit' className='bg-green-500 text-white py-2 rounded-2xl hover:bg-green-600'>
        Зарегистрироваться
      </button>
    </form>
  );
};
