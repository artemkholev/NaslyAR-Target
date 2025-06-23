import React from "react";
import { GoalsList } from "../model";
import { useTranslation } from "react-i18next";

export const Goals = () => {
  const { t } = useTranslation();

  return (
    <article id='goals' className='page__box flex flex-col items-center gap-10 py-16'>
      <h1 className='typography__title text-center font-bold'>
        {t("home_page.goals.title")}
      </h1>
      <GoalsList />
    </article>
  );
};
