import React from "react";

interface ToggleButtonProps {
  isOpen: boolean;
  onToggle: () => void;
}

export const OpenCloseButton = ({ isOpen, onToggle }: ToggleButtonProps) => {
  return (
    <button
      className='relative w-12 h-12 flex items-center justify-center focus:outline-none rounded-full hover:bg-[#F3F3F3]'
      onClick={onToggle}>
      <span
        className={`absolute w-6 h-0.5 bg-[#222222] transition-transform duration-300 ease-in-out ${isOpen ? 'rotate-45' : 'rotate-90'}`}></span>
      <span
        className={`absolute w-6 h-0.5 bg-[#222222] transition-transform duration-300 ease-in-out ${isOpen ? '-rotate-45' : 'rotate-0'}`}></span>
    </button>
  );
};
