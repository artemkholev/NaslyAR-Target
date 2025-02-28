import React from "react";

import DiscountLine from "@/shared/assets/images/main-page/discount/line.png";
import DiscountHand from "@/shared/assets/images/main-page/discount/hand.png";
import DiscountRightImg from "@/shared/assets/images/main-page/discount/right-img.png";

export const Discount = () => {
  return (
    <article id='discount' className='relative flex justify-center'>
      <img className='absolute right-0 top-0 max-lg:right-0' src={DiscountRightImg} alt='Скидка на рекламу' />
      <img className='absolute bottom-0 right-36' src={DiscountLine} alt='Скидка на рекламу' />

      <div className='h-[600px] flex items-center'>
        <div className='flex gap-5'>
          <img className='max-md:absolute max-md:right-0' src={DiscountHand} alt='Скидка на рекламу' />
          <h1 className='z-10 w-3/4 max-sm:w-full flex flex-col font-bold text-5xl max-lg:text-3xl max-sm:text-xl p-8  gap-10'>
            <div>
              Получите до
              <span className='bg-[#797EF6] text-white px-4 text-7xl max-lg:text-5xl max-sm:text-3xl rounded-xl'>
                20000 ₽
              </span>
            </div>
            <span className='whitespace-nowrap'>на продвижение бесплатно</span>
          </h1>
        </div>
      </div>
    </article>
  );
};
