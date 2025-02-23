import React from "react";
import { LoginForm } from "@/widgets/login";
import { RegisterForm } from "@/widgets/register";

const AuthPage = () => {
  return (
    <div className='flex flex-col gap-5'>
      <LoginForm />
      <RegisterForm />
    </div>
  );
};

export default AuthPage;
