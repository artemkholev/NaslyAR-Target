import React from "react";
import { useTranslation } from "react-i18next";

import { GradientButton } from "@/shared/ui/gradient-button";

import IvocationBackgroundDetails from "@/shared/assets/images/main-page/ivocation/background-details.png";

export const Ivocation = () => {
  const { t } = useTranslation("library");

  return (
    <article id='ivocation' className='page__box'>
      <h1 className='typography__title--large'>
        {t("home_page.ivocation.title_1")}
        <span className='bg-[#7bd5f5] p-2 rounded-2xl'>{t("home_page.ivocation.title_2")}</span>
        {t("home_page.ivocation.title_3")}
        <span className='bg-[#797ef6] p-2 rounded-2xl text-white'>
          {t("home_page.ivocation.title_4")}
        </span>
        {t("home_page.ivocation.title_5")}
      </h1>
      <div className='relative flex items-center justify-center w-full bg-[#232424] py-20 rounded-[60px] object-fill'>
        <img
          className='absolute w-full h-full rounded-[60px]'
          style={{ objectFit: "cover" }}
          src={IvocationBackgroundDetails}
          alt='Скидка на запуск рекламы'
        />
        <div className='z-10 flex w-3/5 max-md:w-4/5 flex-col gap-[40px]'>
          <h2 className='typography__title--max !text-white font-bold text-center'>
            {t("home_page.ivocation.discount")}
          </h2>
          <span className='typography__title--medium--white text-center'>
            {t("home_page.ivocation.discount_for_buyer")}
          </span>
          <div className='relative flex mx-auto'>
            <GradientButton>{t("home_page.ivocation.text_button")}</GradientButton>
            <span className='absolute px-2 rounded-full -top-3 -right-2 bg-gradient-to-r from-[#7BD5F5]/50 to-[#787FF6]/50 text-white text-xl rotate-12'>
              {t("home_page.ivocation.text_button_discount")}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
};
