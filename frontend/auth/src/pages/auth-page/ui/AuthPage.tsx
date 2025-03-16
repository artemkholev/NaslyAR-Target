import "../../../app/css/index.css"
import React, { useState } from "react";
import { LoginForm } from "@/widgets/login-form";
import { RegisterForm } from "@/widgets/register-form";

const AuthPage = () => {
  const [activeForm, setActiveForm] = useState<"login" | "register">("login");

  return (
    <div className='page'>
      <div className="page__container justify-center items-center">
        <div className='flex flex-col items-center gap-6'>
          <div className='w-full flex justify-center gap-4'>
            <button
              className={`px-4 py-2 rounded-2xl shadow text-base font-medium ${
                activeForm === "login" ? "bg-[#797EF6] text-white" : "bg-gray-200"
              }`}
              onClick={() => setActiveForm("login")}>
              Войти
            </button>
            <button
              className={`px-4 py-2 rounded-2xl shadow text-base font-medium ${
                activeForm === "register" ? "bg-[#797EF6] text-white" : "bg-gray-200"
              }`}
              onClick={() => setActiveForm("register")}>
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
