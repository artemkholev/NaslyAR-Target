import React from "react";
import { LoginForm } from "@/widgets/login";
import { RegisterForm } from "@/widgets/register";

export const AuthPage = () => {
  return (
    <div>
      <LoginForm />
      <RegisterForm />
    </div>
  );
};
