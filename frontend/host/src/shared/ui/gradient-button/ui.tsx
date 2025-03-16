import React from "react";
import clsx from "clsx";

const GradientButton: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({
  children,
  className, // Получаем className из пропсов
  ...props
}) => {
  return (
    <button
      {...props}
      className={clsx(
        "typography__title--medium--white bg-gradient-bg bg-[length:300%_300%] animate-bg-gradient h-10 px-6 rounded-full shadow-lg hover:shadow-[#787FF6]/50",
        className // Внешние стили
      )}>
      {children}
    </button>
  );
};

export default GradientButton;
