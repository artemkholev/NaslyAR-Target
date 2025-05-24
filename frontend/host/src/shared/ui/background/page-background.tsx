import React from "react";

const PageBackground = () => {
  return (
    <>
      {/* Левый мягкий градиент */}
      <div className='fixed top-0 left-0 h-full w-[100px] z-10 pointer-events-none'>
        <div className='h-full w-full bg-gradient-to-r from-green-50/25 to-transparent' />
      </div>

      {/* Правый мягкий градиент */}
      <div className='fixed top-0 right-0 h-full w-[100px] z-10 pointer-events-none'>
        <div className='h-full w-full bg-gradient-to-l from-green-50/25 to-transparent' />
      </div>
    </>
  );
};

export default PageBackground;
