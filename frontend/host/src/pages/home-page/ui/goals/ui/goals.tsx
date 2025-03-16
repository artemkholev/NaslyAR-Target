import React from "react";
import { GoalsList } from "../model";
import { useTranslation } from "react-i18next";

export const Goals = () => {
  const { t } = useTranslation();

  return (
    <article id='goals' className='page__box'>
      <h1 className='typography__title--max text-center'>{t("home_page.goals.title")}</h1>
      <div className='flex justify-center md:max-lg:grid md:max-lg:grid-cols-2 md:max-lg:place-items-center max-md:flex-col'>
        <GoalsList />
      </div>
    </article>
  );
};
