import React from 'react';

export const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className='w-full flex justify-center'>
      <div className='w-[1200px] max-2xl:w-[1000px] max-lg:w-[90%] flex items-center justify-center gap-[150px] text-[10px] max-lg:gap-8 p-10 max-lg:p-20 max-lg:flex-col max-md:gap-10'>
        <div className='flex items-center text-nowrap'>
          © {year} «NuslyAR | Target» — ваш персональный Авитолог
        </div>

        <div className='flex items-center text-center'>
          Вся предоставленная информация на сайте ни при каких условиях не является публичной
          офертой, определяемой положениями Статьи 437 (2) Гражданского кодекса РФ
        </div>

        <div className='flex items-center text-nowrap'>Разработка сайта: NuslyAR</div>
      </div>
    </footer>
  );
};
