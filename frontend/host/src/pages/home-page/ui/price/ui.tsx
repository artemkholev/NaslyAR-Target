import React from "react";
import { useTranslation } from "react-i18next";

import PriceOval from "@/shared/assets/images/main-page/price/oval.png";
import PriceArrow from "@/shared/assets/images/main-page/price/arrow.png";
import PriceCheckMark from "@/shared/assets/images/main-page/price/check-mark.png";

export const Price = () => {
  const { t } = useTranslation("library");

  return (
    <article id='price' className='relative page__box'>
      <h1 className='typography__title--max'>{t("home_page.price.title")}</h1>
      <div className='typography__title--large'>
        <p>{t("home_page.price.meta_1")}</p>
        <p>{t("home_page.price.meta_2")}</p>
      </div>

      <img className='absolute -right-20 max-xl:right-0 top-32 max-md:top-96' src={PriceOval} alt='цены' />
      <img className='absolute right-60 lg:top-96 max-lg:-bottom-10' src={PriceOval} alt='цены' />

      <div className='grid grid-cols-3 max-lg:grid-cols-2 max-md:grid-cols-1 gap-10 max-md:place-items-center'>
        <div className='z-10 max-lg:w-[380px] max-md:w-[340px] bg-white/70 p-8 max-2xl:p-5 rounded-3xl flex flex-col gap-7'>
          <h2 className='font-bold text-3xl'>{t("home_page.price.tariff_1.title")}</h2>
          <div className='w-full h-[68px] flex items-center p-4 bg-[#F3F3F3] rounded-full gap-3'>
            <span className='font-bold text-2xl max-2xl:text-xl'>
              {t("home_page.price.tariff_1.price")}
            </span>
            <div className='flex items-center gap-1'>
              <span className='line-through'>{t("home_page.price.tariff_1.price_not")}</span>
              <span>{t("home_page.price.period")}</span>
            </div>
          </div>
          <ul className='typography__title--medium  flex flex-col gap-4 list-inside list-disc'>
            <li>{t("home_page.price.tariff_1.li_1")}</li>
            <li>{t("home_page.price.tariff_1.li_2")}</li>
            <li>{t("home_page.price.tariff_1.li_3")}</li>
            <li>{t("home_page.price.tariff_1.li_4")}</li>
            <li>{t("home_page.price.tariff_1.li_5")}</li>
          </ul>
          <button className="button button--gradient">{t("home_page.price.select")}</button>
        </div>
        <div className='max-lg:w-[380px] max-md:w-[340px] bg-white/50 p-8 max-2xl:p-5 rounded-3xl flex flex-col gap-7 z-10'>
          <h2 className='font-bold text-3xl'>{t("home_page.price.tariff_2.title")}</h2>
          <div className='w-full h-[68px] flex items-center p-4 bg-[#F3F3F3] rounded-full gap-3'>
            <span className='font-bold text-2xl max-2xl:text-xl'>
              {t("home_page.price.tariff_2.price")}
            </span>
            <div className='flex items-center gap-1'>
              <span className='line-through'>{t("home_page.price.tariff_2.price_not")}</span>
              <span>{t("home_page.price.period")}</span>
            </div>
          </div>
          <div>
            <div className='typography__title--medium w-full h-[68px] p-4 bg-[#F3F3F3] rounded-full flex gap-5 border-dotted border-2 border-[#777777] items-center justify-center'>
              <img src={PriceCheckMark} alt='Тариф Старт' />
              {t("home_page.price.tariff_2.discription")}
            </div>
            <img src={PriceArrow} alt='Цены' />
          </div>

          <ul className='typography__title--medium  flex flex-col gap-4 list-inside list-disc'>
            <li>{t("home_page.price.tariff_2.li_1")}</li>
            <li>{t("home_page.price.tariff_2.li_2")}</li>
            <li>{t("home_page.price.tariff_2.li_3")}</li>
            <li>{t("home_page.price.tariff_2.li_4")}</li>
          </ul>
          <button className="button button--gradient">{t("home_page.price.select")}</button>
        </div>
        <div className='max-lg:w-[380px] max-md:w-[340px] bg-white/50 p-8 max-2xl:p-5 rounded-3xl flex flex-col gap-7 z-10'>
          <h2 className='font-bold text-3xl'>{t("home_page.price.tariff_3.title")}</h2>
          <div className='w-full h-[68px] flex items-center p-4 bg-[#F3F3F3] rounded-full gap-3'>
            <span className='font-bold text-2xl max-2xl:text-xl'>
              {t("home_page.price.tariff_3.price")}
            </span>
            <div className='flex items-center gap-1'>
              <span className='line-through'>{t("home_page.price.tariff_2.price_not")}</span>
              <span>{t("home_page.price.period")}</span>
            </div>
          </div>
          <div>
            <div className='typography__title--medium w-full h-[68px] p-4 bg-[#F3F3F3] rounded-full flex gap-5 border-dotted border-2 border-[#777777] items-center justify-center'>
              <img src={PriceCheckMark} alt='Тариф Мини' />
              <img src={PriceCheckMark} alt='Тариф Мини' />
              {t("home_page.price.tariff_2.discription")}
            </div>
            <img src={PriceArrow} alt='Цены' />
          </div>

          <ul className='typography__title--medium flex flex-col gap-4 list-inside list-disc'>
            <li>{t("home_page.price.tariff_3.li_1")}</li>
            <li>{t("home_page.price.tariff_3.li_2")}</li>
            <li>{t("home_page.price.tariff_3.li_3")}</li>
            <li>{t("home_page.price.tariff_3.li_4")}</li>
            <li>{t("home_page.price.tariff_3.li_5")}</li>
            <li>{t("home_page.price.tariff_3.li_6")}</li>
            <li>{t("home_page.price.tariff_3.li_7")}</li>
          </ul>
          <button className="button button--gradient">{t("home_page.price.select")}</button>
        </div>
      </div>
    </article>
  );
};
