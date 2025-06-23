import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "host/useAuth";
import { validateEmail, validatePassword } from "@/shared/lib/validatiion";
import { IResponse } from "@/entities/auth";
import { AppRoutes } from "@/app/router";
import Input from "host/Input";

export const LoginForm = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const navigate = useNavigate();

  const parseErrorString = (errorString: string): Record<string, string> => {
    try {
      return JSON.parse(errorString);
    } catch {
      return {};
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setFieldErrors({});

    // Валидация на клиенте
    const errors: Record<string, string> = {};

    if (!validateEmail(email)) {
      errors.email = "Пожалуйста, введите корректный email.";
    }

    if (!validatePassword(password)) {
      errors.password =
        "Пароль должен содержать не менее 8 символов, включая заглавные и строчные буквы, цифры и специальные символы (!@#$%^&*).";
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setErrorMessage("Исправьте ошибки в форме");
      return;
    }

    setIsLoggingIn(true);

    try {
      const response: IResponse = await login(email, password);

      if (response.success === true) {
        console.log("Вход выполнен успешно!");
        navigate(AppRoutes.HOME);
      } else {
        const serverErrors = response.errors ? parseErrorString(response.errors) : {};

        if (Object.keys(serverErrors).length > 0) {
          setFieldErrors(serverErrors);
        }

        setErrorMessage(
          response.message || "Неверный email или пароль. Пожалуйста, попробуйте снова."
        );
      }
    } catch (err) {
      console.error("Ошибка при входе:", err);
      setErrorMessage("Произошла непредвиденная ошибка. Пожалуйста, попробуйте снова.");
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='form w-[400px]'>
      <Input
        type='email'
        placeholder='Email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={isLoggingIn}
        error={fieldErrors.email}
      />

      <Input
        type='password'
        placeholder='Пароль'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        disabled={isLoggingIn}
        error={fieldErrors.password}
      />

      {errorMessage && <div className='w-[300px] mb-4 text-red-500'>{errorMessage}</div>}

      <button type='submit' disabled={isLoggingIn} className='button button--gradient w-full'>
        {isLoggingIn ? "Входим..." : "Войти"}
      </button>
    </form>
  );
};
