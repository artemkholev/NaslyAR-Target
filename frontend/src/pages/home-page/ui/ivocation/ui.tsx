import Image from 'next/image';

import IvocationBackgroundDetails from '@/shared/assets/images/main-page/ivocation/background-details.png';

export const Ivocation = () => {
  return (
    <article id='ivocation' className='w-full flex justify-center mb-10'>
      <div className='w-[1200px] max-2xl:w-[1000px] max-lg:w-[90%]'>
        <h1 className='font-medium text-4xl p-8 leading-relaxed'>
          Вы получаете <span className='bg-[#7bd5f5] p-2 rounded-2xl'>максимум</span> обращений с
          Авито при <span className='bg-[#797ef6] p-2 rounded-2xl text-white'>минимальной</span>{' '}
          стоимости клиента
        </h1>
        <div className='relative flex items-center justify-center w-full bg-[#232424] py-20 rounded-[60px] object-fill'>
          <Image
            className='rounded-[60px]'
            style={{ objectFit: 'cover' }}
            src={IvocationBackgroundDetails}
            alt='Скидка на запуск рекламы'
            fill={true}
          />
          <div className='z-10 flex w-3/5 max-md:w-4/5 flex-col gap-[40px]'>
            <h2 className='text-white font-bold text-5xl top-10 text-center max-lg:text-3xl'>
              Запустите свой бизнес на Авито со скидкой 20%
            </h2>
            <span className='text-white text-2xl text-center max-lg:text-base'>
              Мы дарим скидку новым клиентам, которая сохраняется для вас навсегда
            </span>
            <div className='relative w-64 flex mx-auto'>
              <button className='bg-gradient-bg bg-[length:300%_300%] animate-bg-gradient w-60 h-[55px] p-4 rounded-full text-white shadow-lg hover:shadow-[#787FF6]/50'>
                Выбрать тариф
              </button>
              <span className='absolute px-2 rounded-full -top-3 -right-2 bg-gradient-to-r from-[#7BD5F5]/50 to-[#787FF6]/50 text-white text-xl rotate-12'>
                -20%
              </span>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};
