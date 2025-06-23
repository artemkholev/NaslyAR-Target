import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "host/useAuth";
import { validateEmail, validatePassword } from "@/shared/lib/validatiion";
import { IResponse } from "@/entities/auth";
import { AppRoutes } from "@/app/router";
import Input from "host/Input";

export const RegisterForm = () => {
  const { register } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [acceptedTerms, setAcceptedTerms] = useState(false);
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
        "Пароль должен содержать не менее 8 символов, включая заглавные и строчные буквы, цифры и специальные символы (!@#$%^&*)";
    }

    if (password !== confirmPassword) {
      errors.confirmPassword = "Пароли не совпадают.";
    }

    if (!acceptedTerms) {
      errors.terms = "Пожалуйста, примите условия сайта.";
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setErrorMessage("Исправьте ошибки в форме");
      return;
    }

    setIsRegistering(true);

    try {
      const response: IResponse = await register(email, password);

      if (response.success === true) {
        console.log("Регистрация успешна");
        navigate(AppRoutes.HOME);
      } else {
        const serverErrors = response.errors ? parseErrorString(response.errors) : {};

        if (Object.keys(serverErrors).length > 0) {
          setFieldErrors(serverErrors);
        }

        setErrorMessage(response.message || "Произошла ошибка при регистрации");
      }
    } catch (err) {
      console.error("Ошибка при регистрации:", err);
      setErrorMessage("Произошла непредвиденная ошибка. Пожалуйста, попробуйте снова.");
    } finally {
      setIsRegistering(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='form w-[400px]'>
      {errorMessage && <div className='mb-4 p-3 text-red-500'>{errorMessage}</div>}

      <Input
        type='email'
        placeholder='Email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={isRegistering}
        error={fieldErrors.email}
      />

      <Input
        type='password'
        placeholder='Пароль'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        disabled={isRegistering}
        error={fieldErrors.password}
      />

      <Input
        type='password'
        placeholder='Подтвердите пароль'
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        disabled={isRegistering}
        error={fieldErrors.confirmPassword}
      />

      <div className='flex mt-4 gap-2 items-center'>
        <input
          type='checkbox'
          id='terms'
          checked={acceptedTerms}
          onChange={(e) => setAcceptedTerms(e.target.checked)}
          disabled={isRegistering}
          className='mt-1'
        />
        <label htmlFor='terms' className='flex gap-1 text-sm'>
          <span>Я принимаю</span>
          <a href={AppRoutes.PRIVACY_POLICY} className='text-blue-500 hover:underline'>
            условия использования
          </a>
        </label>
      </div>
      {fieldErrors.terms && <p className='text-red-500 text-sm mt-1'>{fieldErrors.terms}</p>}

      <button
        type='submit'
        disabled={isRegistering}
        className='button button--gradient w-full mt-4'>
        {isRegistering ? "Загрузка..." : "Зарегистрироваться"}
      </button>
    </form>
  );
};
