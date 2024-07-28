import Image from 'next/image';

import PriceOval from '@/shared/assets/images/main-page/price/oval.png';
import PriceArrow from '@/shared/assets/images/main-page/price/arrow.png';
import PriceCheckMark from '@/shared/assets/images/main-page/price/check-mark.png';

export const Price = () => {
  return (
    <article id='price' className='w-full flex justify-center mb-10'>
      <div className='w-[1200px] max-2xl:w-[1000px] max-lg:w-[90%] relative'>
        <h1 className='font-bold text-4xl p-8'>Сколько стоит?</h1>
        <div className='w-2/3 px-8 text-2xl mb-10'>
          <p>Вы точно найдете подходящее для себя</p>
          <p>решение, ведь мы создали прозрачные тарифы</p>
        </div>

        <Image
          className='absolute -right-20 max-xl:right-0 top-32 max-md:top-96'
          src={PriceOval}
          priority
          alt='цены'
        />
        <Image
          className='absolute right-60 lg:top-96 max-lg:-bottom-10'
          src={PriceOval}
          priority
          alt='цены'
        />

        <div className='grid grid-cols-3 max-lg:grid-cols-2 max-md:grid-cols-1 gap-10 max-md:place-items-center'>
          <div className='z-10 max-lg:w-[380px] max-md:w-[340px] h-[640px] bg-white/70 p-8 max-2xl:p-5 rounded-3xl flex flex-col gap-7'>
            <h2 className='font-bold text-3xl'>Старт</h2>
            <div className='w-full h-[68px] flex items-center p-4 bg-[#F3F3F3] rounded-full gap-3'>
              <span className='font-bold text-2xl max-2xl:text-xl'>9 600 ₽</span>
              <div className='flex items-center gap-1'>
                <span className='line-through'>12 000 ₽</span>
                <span>в месяц</span>
              </div>
            </div>
            <ul className='flex flex-col gap-4 list-inside list-disc'>
              <li>Анализ ниши и подбор тарифного плана</li>
              <li>Оформление страницы магазина или публичного профиля</li>
              <li>Создание конверсионного текста для ваших объявлений</li>
              <li>Подбор ключевых слов для формирования заголовков объявлений</li>
              <li>Ежедневная публикация объявлений</li>
            </ul>
            <button className='bg-gradient-bg bg-[length:300%_300%] animate-bg-gradient w-full h-[55px] p-4 rounded-full text-white shadow-lg hover:shadow-[#787FF6]/50'>
              Выбрать тариф
            </button>
          </div>
          <div className='max-lg:w-[380px] max-md:w-[340px]  h-[670px] bg-white/50 p-8 max-2xl:p-5 rounded-3xl flex flex-col gap-7 z-10'>
            <h2 className='font-bold text-3xl'>Мини</h2>
            <div className='w-full h-[68px] flex items-center p-4 bg-[#F3F3F3] rounded-full gap-3'>
              <span className='font-bold text-2xl max-2xl:text-xl'>17 600 ₽</span>
              <div className='flex items-center gap-1'>
                <span className='line-through'>22 000 ₽</span>
                <span>в месяц</span>
              </div>
            </div>
            <div>
              <div className='w-full h-[68px] p-4 bg-[#F3F3F3] rounded-full flex gap-5 border-dotted border-2 border-[#777777] items-center justify-center'>
                <Image src={PriceCheckMark} alt='Тариф Старт' />
                Всё, что входит в «Старт»
              </div>
              <Image src={PriceArrow} alt='Цены' />
            </div>

            <ul className='flex flex-col gap-4 list-inside list-disc'>
              <li>Формирование маркетинговой стратегии и настройка рекламных кампаний</li>
              <li>Отчёты о результатах работы еженедельно</li>
              <li>Проектный менеджер</li>
              <li>Инфографика обложек объявлений, всего до 5 обложек</li>
            </ul>
            <button className='bg-gradient-bg bg-[length:300%_300%] animate-bg-gradient w-full h-[55px] p-4 rounded-full text-white shadow-lg hover:shadow-[#787FF6]/50'>
              Выбрать тариф
            </button>
          </div>
          <div className='max-lg:w-[380px] max-md:w-[340px] h-[790px] bg-white/50 p-8 max-2xl:p-5 rounded-3xl flex flex-col gap-7 z-10'>
            <h2 className='font-bold text-3xl'>Базовый</h2>
            <div className='w-full h-[68px] flex items-center p-4 bg-[#F3F3F3] rounded-full gap-3'>
              <span className='font-bold text-2xl max-2xl:text-xl'>29 600 ₽</span>
              <div className='flex items-center gap-1'>
                <span className='line-through'>37 000 ₽</span>
                <span>в месяц</span>
              </div>
            </div>
            <div>
              <div className='w-full h-[68px] p-4 bg-[#F3F3F3] rounded-full flex gap-5 border-dotted border-2 border-[#777777] items-center justify-center'>
                <Image src={PriceCheckMark} alt='Тариф Мини' />
                Всё, что входит в «Мини»
              </div>
              <Image src={PriceArrow} alt='Цены' />
            </div>

            <ul className='flex flex-col gap-4 list-inside list-disc'>
              <li>Дорожная карта проекта</li>
              <li>Анализ стратегии ключевых конкурентов</li>
              <li>A/B-тесты маркетинговых гипотез</li>
              <li>Ежедневная коммуникация с командой проекта в мессенджере</li>
              <li>3 положительных отзыва и удаление отрицательных</li>
              <li>Отслеживание до 5 маркетинговых показателей</li>
              <li>Инфографика обложек объявлений, всего до 15 обложек</li>
            </ul>
            <button className='bg-gradient-bg bg-[length:300%_300%] animate-bg-gradient w-full h-[55px] p-4 rounded-full text-white shadow-lg hover:shadow-[#787FF6]/50'>
              Выбрать тариф
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};
