import React, { useState } from "react";
import { useAuth } from "host/useAuth";
import Input from "host/Input";
import GradientButton from "host/GradientButton";

export const LoginForm = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [error, setError] = useState("");

  // Валидация email
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Валидация пароля
  const validatePassword = (password: string) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*]/.test(password);

    return (
      password.length >= minLength &&
      hasUpperCase &&
      hasLowerCase &&
      hasNumber &&
      hasSpecialChar
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Проверка валидации email
    if (!validateEmail(email)) {
      setError("Пожалуйста, введите корректный email.");
      return;
    }

    // Проверка валидации пароля
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
      setEmail("");
      setPassword("");
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
      <GradientButton
        type='submit'
        disabled={isLoggingIn}
        className='mt-4'
      >
        {isLoggingIn ? "Входим..." : "Войти"}
      </GradientButton>
    </form>
  );
};