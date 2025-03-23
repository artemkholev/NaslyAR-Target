import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "host/useAuth";
import { validateEmail, validatePassword } from "@/shared/lib/validatiion";
import { AppRoutes } from "@/app/router";
import Input from "host/Input";
import GradientButton from "host/GradientButton";

export const RegisterForm = () => {
  const { register } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Пожалуйста, введите корректный email.");
      return;
    }

    if (!validatePassword(password)) {
      setError("Пароль должен содержать не менее 8 символов.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Пароли не совпадают.");
      return;
    }

    if (!acceptedTerms) {
      setError("Пожалуйста, примите условия сайта.");
      return;
    }

    setIsRegistering(true);
    setError("");

    try {
      await register(email, password);
      console.log("Регистрация успешна!");
      navigate(AppRoutes.HOME);
    } catch (err) {
      console.error("Ошибка при регистрации:", err);
      setError("Произошла ошибка при регистрации. Пожалуйста, попробуйте снова.");
    } finally {
      setIsRegistering(false);
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
        disabled={isRegistering}
      />

      {/* Поле для ввода пароля */}
      <Input
        type='password'
        placeholder='Пароль'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        disabled={isRegistering}
      />

      {/* Поле для подтверждения пароля */}
      <Input
        type='password'
        placeholder='Подтвердите пароль'
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        disabled={isRegistering}
      />

      {/* Галочка для принятия условий */}
      <div className='flex items-center mt-4'>
        <input
          type='checkbox'
          id='terms'
          checked={acceptedTerms}
          onChange={(e) => setAcceptedTerms(e.target.checked)}
          disabled={isRegistering}
          className='mr-2'
        />
        <label htmlFor='terms' className='text-sm'>
          Я принимаю{" "}
          <a href='/terms' className='text-blue-500 hover:underline'>
            условия использования
          </a>
        </label>
      </div>

      {/* Кнопка регистрации */}
      <GradientButton type='submit' disabled={isRegistering} className='mt-4'>
        {isRegistering ? "Загрузка..." : "Зарегистрироваться"}
      </GradientButton>

      {/* Вывод ошибок */}
      {error && <p className='text-red-500 mt-2'>{error}</p>}
    </form>
  );
};
