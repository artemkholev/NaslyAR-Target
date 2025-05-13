/// <reference types="react" />

declare module "host/Input" {
  import React from "react";

  interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    type?: "text" | "password" | "email"; // Тип инпута
    label?: string; // Лейбл для инпута
    error?: string; // Сообщение об ошибке
    icon?: "email" | "password"; // Тип иконк

    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void; // Обработчик изменения
  }

  const Input: React.FC<InputProps>; // Типизация компонента
  export default Input; // Экспорт компонента
}
