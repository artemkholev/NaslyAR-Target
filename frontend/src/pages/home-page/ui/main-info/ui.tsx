import Image from 'next/image';

import MainInfoAvitoProfi from '@/shared/assets/images/main-page/main-info/avitoprofi.png';
import MainInfoUpgrowth from '@/shared/assets/images/main-page/main-info/upgrowth.png';
import MainInfoMoney from '@/shared/assets/images/main-page/main-info/money.png';
import MainInfoDiamond from '@/shared/assets/images/main-page/main-info/diamond.png';

export const MainInfo = () => {
  return (
    <article id='main-info' className='w-full flex justify-center mb-10'>
      <div className='w-[1200px] max-2xl:w-[1000px] max-lg:w-[90%] h-[400px] max-2xl:h-[450px] max-md:h-[600px] max-sm:h-[700px] flex relative overflow-hidden'>
        <div className='flex justify-between gap-32 items-start max-md:gap-8 max-md:flex-col'>
          <div className='flex flex-col gap-10 max-md:gap-5 py-5'>
            <h1 className='font-bold text-5xl leading-tight max-lg:text-3xl'>
              Выращивайте продажи на Авито до 200%
            </h1>
            <p className='text-2xl text-gray-500 w-2/3 max-md:w-full leading-relaxed max-lg:text-xl'>
              Получайте клиентов в 2 раза дешевле уже через месяц
            </p>
            <button className='bg-gradient-bg bg-[length:300%_300%] animate-bg-gradient w-[200px] h-[55px] p-4 rounded-full text-white shadow-lg hover:shadow-[#787FF6]/50'>
              Узнать подробности
            </button>
          </div>
          <Image
            className='mr-28 max-lg:mr-10 max-md:ml-auto max-md:mr-0 max-sm:hidden'
            src={MainInfoAvitoProfi}
            width={315}
            priority
            alt='авито, услуги и товары'
          />
          <div className='bg-white/90 absolute w-64 h-20 rounded-full right-1/4 max-md:right-0 top-0 max-md:top-[30%] max-sm:top-[45%] flex gap-5 p-4 items-center'>
            <Image src={MainInfoDiamond} alt='7 лет работы' />
            <span className='text-xl'>7 лет работы с Авито</span>
          </div>
          <div className='bg-white/90 absolute w-80 h-20 rounded-full right-[30%] top-1/2 flex gap-5 p-4 items-center max-md:left-0 max-md:top-[80%]'>
            <Image src={MainInfoMoney} alt='Бюджет от 30000 тыс.' />
            <span className='text-xl'>Работаем с бюджетом от 30 000 ₽</span>
          </div>
          <div className='bg-white/90 absolute w-60 h-20 rounded-full right-0 top-1/2 flex gap-5 p-4 items-center max-2xl:right-[40%] max-2xl:top-[75%] max-md:top-[60%] max-md:left-0'>
            <Image src={MainInfoUpgrowth} alt='Рост заявок' />
            <span className='text-xl'>Рост заявок от 30%</span>
          </div>
        </div>
      </div>
    </article>
  );
};
