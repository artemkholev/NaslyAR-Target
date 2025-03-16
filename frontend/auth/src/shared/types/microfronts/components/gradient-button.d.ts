/// <reference types="react" />

declare module "host/GradientButton" {
  import React from "react";

  interface GradientButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode; // Содержимое кнопки
    onClick?: () => void; // Обработчик клика
    disabled?: boolean; // Состояние кнопки
    className?: string; // Дополнительные классы для стилизации
  }

  const GradientButton: React.FC<GradientButtonProps>; // Типизация компонента
  export default GradientButton; // Экспорт компонента
}
