import React from "react";
import { useTranslation } from "react-i18next";
import MainInfoUpgrowth from "@/shared/assets/images/main-page/main-info/upgrowth.png";
import MainInfoMoney from "@/shared/assets/images/main-page/main-info/money.png";
import MainInfoDiamond from "@/shared/assets/images/main-page/main-info/diamond.png";

const cards = [
  {
    img: MainInfoDiamond,
    i18nKey: "home_page.main_info.description_experience_1",
    className: "left-0 top-0",
  },
  {
    img: MainInfoMoney,
    i18nKey: "home_page.main_info.description_experience_2",
    className: "right-0 top-12",
  },
  {
    img: MainInfoUpgrowth,
    i18nKey: "home_page.main_info.description_experience_3",
    className: "left-1/2 top-36 -translate-x-1/2",
  },
];

export const MainInfo: React.FC = () => {
  const { t } = useTranslation();

  return (
    <article id='main-info' className='relative flex flex-col items-center overflow-hidden'>
      {/* Основной текст и кнопка */}
      <section className='text-center max-w-3xl py-12 px-4 animate-fade-in-up'>
        <h1 className='typography__title font-bold mb-4'>{t("home_page.main_info.title")}</h1>
        <p className='typography__text text-gray-500 mb-6'>
          {t("home_page.main_info.description")}
        </p>
        <button className='button button--gradient'>{t("home_page.main_info.text_button")}</button>
      </section>

      {/* Декоративные карточки */}
      <section className='relative w-full max-w-4xl h-64 mt-10'>
        {cards.map(({ img, i18nKey, className }, idx) => (
          <div
            key={idx}
            className={`absolute ${className} bg-white/80 backdrop-blur-md shadow-lg rounded-full flex items-center gap-4 px-6 py-4 h-20 transition-transform duration-300 hover:scale-105 animate-fade-in-up`}>
            <img src={img} alt={t(i18nKey)} className='w-12 h-12' />
            <span className='typography__text font-medium'>{t(i18nKey)}</span>
          </div>
        ))}
      </section>
    </article>
  );
};
