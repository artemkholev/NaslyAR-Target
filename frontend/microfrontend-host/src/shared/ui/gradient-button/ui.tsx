import React from "react";

export const GradientButton: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({
  children,
  ...props
}) => {
  return (
    <button
      {...props}
      className='typography__title--medium--white bg-gradient-bg bg-[length:300%_300%] animate-bg-gradient h-[55px] px-6 rounded-full shadow-lg hover:shadow-[#787FF6]/50 inline-block max-w-max'>
      {children}
    </button>
  );
};
