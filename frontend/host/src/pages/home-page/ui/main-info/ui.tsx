import React from "react";
import MainInfoAvitoProfi from "@/shared/assets/images/main-page/main-info/avitoprofi.png";
import MainInfoUpgrowth from "@/shared/assets/images/main-page/main-info/upgrowth.png";
import MainInfoMoney from "@/shared/assets/images/main-page/main-info/money.png";
import MainInfoDiamond from "@/shared/assets/images/main-page/main-info/diamond.png";
import { useTranslation } from "react-i18next";
import { GradientButton } from "@/shared/ui/gradient-button";

export const MainInfo: React.FC = () => {
  const { t } = useTranslation();

  return (
    <article
      id='main-info'
      className='h-[400px] max-2xl:h-[500px] max-md:h-[600px] max-sm:h-[700px] flex relative overflow-hidden justify-center'>
      <div className='flex justify-between gap-80 max-2xl:gap-64 items-start max-md:gap-8 max-md:flex-col'>
        <div className='flex flex-col gap-10 max-md:gap-5 py-5'>
          <h1 className='text-4xl font-bold'>{t("home_page.main_info.title")}</h1>
          <p className='text-lg text-gray-500'>{t("home_page.main_info.description")}</p>
          <GradientButton>{t("home_page.main_info.text_button")}</GradientButton>
        </div>

        <img
          src={MainInfoAvitoProfi}
          alt='авито, услуги и товары'
          width={315}
          className='mr-28 max-lg:mr-10 max-md:ml-auto max-md:mr-0 max-sm:hidden'
        />

        <div className='bg-white/90 absolute w-64 h-20 rounded-full right-1/4 max-md:right-0 top-0 max-md:top-[30%] max-sm:top-[45%] flex gap-5 p-4 items-center'>
          <img
            src={MainInfoDiamond}
            alt={t("home_page.main_info.description_experience_1")}
            className='w-12 h-12'
          />
          <span className='text-lg font-medium'>
            {t("home_page.main_info.description_experience_1")}
          </span>
        </div>

        <div className='bg-white/90 absolute w-80 h-20 rounded-full right-[25%] top-1/2 flex gap-5 p-4 items-center max-md:left-0 max-md:top-[80%]'>
          <img
            src={MainInfoMoney}
            alt={t("home_page.main_info.description_experience_2")}
            className='w-12 h-12'
          />
          <span className='text-lg font-medium'>
            {t("home_page.main_info.description_experience_2")}
          </span>
        </div>

        <div className='bg-white/90 absolute w-60 h-20 rounded-full right-0 top-1/2 flex gap-5 p-4 items-center max-2xl:right-[40%] max-2xl:top-[75%] max-md:top-[60%] max-md:left-0'>
          <img
            src={MainInfoUpgrowth}
            alt={t("home_page.main_info.description_experience_3")}
            className='w-12 h-12'
          />
          <span className='text-lg font-medium'>
            {t("home_page.main_info.description_experience_3")}
          </span>
        </div>
      </div>
    </article>
  );
};
