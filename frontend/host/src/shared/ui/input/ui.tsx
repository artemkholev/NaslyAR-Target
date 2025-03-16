import React, { useState } from "react";
import { FaEye, FaEyeSlash, FaEnvelope, FaLock } from "react-icons/fa"; // Импорт иконок

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  type?: "text" | "password" | "email"; // Тип инпута
  label?: string; // Лейбл для инпута
  error?: string; // Сообщение об ошибке
  icon?: "email" | "password"; // Тип иконки
}

const Input: React.FC<InputProps> = ({ type = "text", label, error, icon, ...props }) => {
  const [showPassword, setShowPassword] = useState(false); // Состояние для показа пароля

  // Выбор иконки в зависимости от пропса `icon`
  const getIcon = () => {
    switch (icon) {
      case "email":
        return <FaEnvelope className='text-gray-400' />;
      case "password":
        return <FaLock className='text-gray-400' />;
      default:
        return null;
    }
  };

  return (
    <div className='w-full'>
      {label && <label className='block text-sm font-medium text-gray-700 mb-1'>{label}</label>}
      <div className='relative'>
        {icon && ( // Отображение иконки
          <span className='absolute inset-y-0 left-3 flex items-center'>{getIcon()}</span>
        )}
        <input
          {...props}
          type={type === "password" && showPassword ? "text" : type} // Переключение типа для пароля
          className={`w-full px-4 py-2 border ${
            error ? "border-red-500" : "border-gray-300"
          } rounded-[10px] focus:outline-none focus:ring-1 ${
            error
              ? "focus:border-red-500 focus:ring-red-500"
              : "focus:border-blue-500 focus:ring-blue-500"
          } transition-colors ${icon ? "pl-10" : ""}`} // Отступ для иконки
        />
        {type === "password" && ( // Кнопка для показа/скрытия пароля
          <button
            type='button'
            onClick={() => setShowPassword(!showPassword)}
            className='absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-600'>
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        )}
      </div>
      {error && <p className='text-red-500 text-sm mt-1'>{error}</p>}
    </div>
  );
};

export default Input;
