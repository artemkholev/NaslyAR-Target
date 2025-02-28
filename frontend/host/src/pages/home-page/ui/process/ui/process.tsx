import React from "react";
import { useTranslation } from "react-i18next";

import { ProcessesList } from "../model";

export const Process: React.FC = () => {
  const { t } = useTranslation();

  return (
    <article id='process' className='page__box'>
      <h1 className='typography__title--large text-center md:max-lg:mb-[80px]'>
        {t("home_page.process.title")}
      </h1>

      <div className='relative h-auto w-full grid grid-cols-2 max-lg:grid-cols-1'>
        <ProcessesList />
      </div>
    </article>
  );
};
