import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "host/useAuth";
import { validateEmail, validatePassword } from "@/shared/lib/validatiion";
import { AppRoutes } from "@/app/router";
import Input from "host/Input";
import GradientButton from "host/GradientButton";

export const LoginForm = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Пожалуйста, введите корректный email.");
      return;
    }

    if (!validatePassword(password)) {
      setError(
        "Пароль должен содержать не менее 8 символов, включая заглавные и строчные буквы, цифры и специальные символы (!@#$%^&*)."
      );
      return;
    }

    setIsLoggingIn(true);
    setError("");

    try {
      await login(email, password);
      console.log("Вход выполнен успешно!");
      navigate(AppRoutes.HOME);
    } catch (err) {
      console.error("Ошибка при входе:", err);
      setError("Неверный email или пароль. Пожалуйста, попробуйте снова.");
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='form'>
      {/* Поле для ввода email */}
      <Input
        type='email'
        placeholder='Email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={isLoggingIn}
      />

      {/* Поле для ввода пароля */}
      <Input
        type='password'
        placeholder='Пароль'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        disabled={isLoggingIn}
      />

      {/* Вывод ошибок */}
      {error && <p className='text-red-500 mt-2'>{error}</p>}

      {/* Кнопка входа */}
      <GradientButton type='submit' disabled={isLoggingIn} className='mt-4'>
        {isLoggingIn ? "Входим..." : "Войти"}
      </GradientButton>
    </form>
  );
};
