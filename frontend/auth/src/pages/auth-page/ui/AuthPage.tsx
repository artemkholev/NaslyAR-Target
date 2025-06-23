import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { LoginForm } from "@/widgets/login-form";
import { RegisterForm } from "@/widgets/register-form";
import { AppRoutes } from "@/app/router";
import "../../../app/css/index.css";

enum formType {
  LOGIN = "login",
  REGISTER = "register",
}

const AuthPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeForm, setActiveForm] = useState<formType>(
    location.pathname === `${AppRoutes.AUTH}/${formType.REGISTER}`
      ? formType.REGISTER
      : formType.LOGIN
  );

  const handleFormChange = (formType: formType) => {
    setActiveForm(formType);
    navigate(`${AppRoutes.AUTH}/${formType}`);
  };

  return (
    <div className='page'>
      <div className='page__container'>
        <div className='flex flex-row justify-center gap-6'>
          <button
            className={`${activeForm === formType.LOGIN ? "button bg-green-800" : "button"}`}
            onClick={() => handleFormChange(formType.LOGIN)}>
            Войти
          </button>
          <button
            className={`${activeForm === formType.REGISTER ? "button bg-green-800" : "button"}`}
            onClick={() => handleFormChange(formType.REGISTER)}>
            Зарегистрироваться
          </button>
        </div>
        {activeForm === formType.LOGIN ? <LoginForm /> : <RegisterForm />}
      </div>
    </div>
  );
};

export default AuthPage;
