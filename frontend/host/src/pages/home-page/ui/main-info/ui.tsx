import React from "react";
import { useTranslation } from "react-i18next";
import { TrendingUp, PiggyBank, Gem, Users, Target, Rocket } from "lucide-react";
import { AppRoutes } from "@/app/router";
import { Link } from "react-router-dom";

const cards = [
  {
    Icon: Gem,
    i18nKey: "home_page.main_info.description_experience_1",
    className: "left-0 top-0",
    iconColor: "text-purple-600",
  },
  {
    Icon: PiggyBank,
    i18nKey: "home_page.main_info.description_experience_2",
    className: "right-0 top-12",
    iconColor: "text-green-600",
  },
  {
    Icon: TrendingUp,
    i18nKey: "home_page.main_info.description_experience_3",
    className: "left-1/2 top-36 -translate-x-1/2",
    iconColor: "text-blue-600",
  },
  {
    Icon: Users,
    i18nKey: "home_page.main_info.description_experience_4",
    className: "left-10 bottom-10",
    iconColor: "text-pink-600",
  },
  {
    Icon: Target,
    i18nKey: "home_page.main_info.description_experience_5",
    className: "right-10 bottom-6",
    iconColor: "text-red-600",
  },
  {
    Icon: Rocket,
    i18nKey: "home_page.main_info.description_experience_6",
    className: "left-1/2 bottom-24 -translate-x-1/2",
    iconColor: "text-yellow-500",
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
        <Link to={AppRoutes.ABOUT_TARGET}>
          <button className='button button--gradient'>
            {t("home_page.main_info.text_button")}
          </button>
        </Link>
      </section>

      {/* Карточки */}
      <section className='relative w-full max-w-6xl h-[30rem] mt-10'>
        {cards.map(({ Icon, i18nKey, className, iconColor }, idx) => (
          <div
            key={idx}
            className={`absolute ${className} bg-white/80 backdrop-blur-md shadow-lg rounded-full flex items-center gap-4 px-6 py-4 h-20 transition-transform duration-300 hover:scale-105 animate-fade-in-up`}>
            <Icon size={28} className={iconColor} />
            <span className='typography__text font-medium'>{t(i18nKey)}</span>
          </div>
        ))}
      </section>
    </article>
  );
};
