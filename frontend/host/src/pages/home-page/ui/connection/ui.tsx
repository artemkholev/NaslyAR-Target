import React from "react";

import { Input } from "@/shared/ui/input";
import { GradientButton } from "@/shared/ui/gradient-button";

export const Connection = () => {
  return (
    <article id='connection' className='page__box'>
      <h1 className='typography__title--max text-center'>Связаться с нами очень просто!</h1>
      <div className='w-full flex bg-[#232424] rounded-[30px] p-14 gap-20 max-lg:flex-col'>
        <div className='flex flex-col bg-gradient-to-b from-[#4D4D4D] to-[#797979] p-10 rounded-[30px]'>
          <h2 className='!text-white typography__title--max max-md:text-3xl font-bold leading-normal'>
            Ну что, готов запустить <span className='line-through'>ракету</span> объявленияв космос
          </h2>
          <span className='text-white text-4xl max-md:text-2xl leading-normal'>Тогда погнали!</span>
        </div>
        <div className='h-full flex flex-col gap-5'>
          <Input placeholder='Ваше имя' type='text' />
          <Input placeholder='e-mail' type='text' />
          <Input placeholder='Номер телефона' type='text' />
          <GradientButton>Старт</GradientButton>
          <p className='text-white text-xs'>
            Нажимая на кнопку, вы даете согласие на обработку персональных данных и соглашаетесь c{" "}
            <a href='/privacy-policy'>
              <span className='text-[#FF8562]'>политикой конфиденциальности</span>
            </a>
          </p>
        </div>
      </div>
    </article>
  );
};
