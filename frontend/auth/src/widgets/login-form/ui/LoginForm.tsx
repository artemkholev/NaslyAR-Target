import React, { useState } from "react";

export const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login with:", { email, password });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 rounded-xl w-full"
        required
      />
      <input
        type="password"
        placeholder="Пароль"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2 rounded-xl w-full"
        required
      />
      <button
        type="submit"
        className="bg-blue-500 text-white py-2 rounded-2xl hover:bg-blue-600"
      >
        Войти
      </button>
    </form>
  );
};
