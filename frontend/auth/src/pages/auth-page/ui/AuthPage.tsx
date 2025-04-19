import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { LoginForm } from "@/widgets/login-form";
import { RegisterForm } from "@/widgets/register-form";

const AuthPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeForm, setActiveForm] = useState<"login" | "register">(
    location.pathname === "/auth/register" ? "register" : "login"
  );

  const handleFormChange = (formType: "login" | "register") => {
    setActiveForm(formType);
    navigate(`/auth/${formType}`);
  };

  return (
    <div className='page'>
      <div className='page__container justify-center items-center'>
        <div className="!w-80 flex flex-col gap-8 justify-center items-center">
          <div className='flex flex-row gap-8'>
            <button
              className={`button ${
                activeForm === "login"
                  ? "bg-green-500 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
              onClick={() => handleFormChange("login")}>
              Войти
            </button>
            <button
              className={`button ${
                activeForm === "register"
                  ? "bg-green-500 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
              onClick={() => handleFormChange("register")}>
              Зарегистрироваться
            </button>
          </div>
          {activeForm === "login" ? <LoginForm /> : <RegisterForm />}
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
