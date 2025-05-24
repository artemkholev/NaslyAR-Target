import React from "react";
import { useTranslation } from "react-i18next";

export const Ivocation = () => {
  const { t } = useTranslation();

  return (
    <section
      id='ivocation'
      className='page__box flex justify-center items-center py-20 bg-gradient-to-b bg-[--component-bg] rounded-[40px]'>
      <div className='w-full max-w-6xl px-6 md:px-12 grid md:grid-cols-2 gap-10 items-center'>
        {/* Текстовая часть */}
        <div className='space-y-6'>
          <h2 className='text-3xl font-semibold text-black-900 leading-snug'>
            {t("home_page.ivocation.title_1")}
            <span className='text-green-900'> {t("home_page.ivocation.title_2")}</span>
            {t("home_page.ivocation.title_3")}
            <span className='text-blue-800'> {t("home_page.ivocation.title_4")}</span>
            {t("home_page.ivocation.title_5")}
          </h2>

          <p className='text-lg text-black-700'>{t("home_page.ivocation.discount_for_buyer")}</p>
        </div>

        {/* Блок CTA */}
        <div className='relative bg-white p-8 rounded-3xl shadow-regular space-y-6'>
          <h3 className='text-xl font-medium text-black-900 text-center'>
            {t("home_page.ivocation.discount")}
          </h3>

          <div className="flex justify-center">
            <button className='button button--gradient mx-auto'>
              {t("home_page.ivocation.text_button")}
            </button>
          </div>

          <span className='absolute top-[-10px] right-[-10px] text-sm bg-green-100 text-white px-3 py-1 rounded-full shadow-md rotate-6'>
            {t("home_page.ivocation.text_button_discount")}
          </span>
        </div>
      </div>
    </section>
  );
};
