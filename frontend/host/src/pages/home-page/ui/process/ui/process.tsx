import React from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { ProcessesList } from "../model";

export const Process: React.FC = () => {
  const { t } = useTranslation();

  return (
    <article id='process' className='page__box'>
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, amount: 0.5 }}
        className='typography__title text-center font-bold mb-16'>
        {t("home_page.process.title")}
      </motion.h1>

      <div className='relative flex flex-col items-center before:content-[""] before:absolute before:w-1 before:bg-gray-300 before:h-full before:left-1/2 before:-translate-x-1/2 max-md:before:hidden'>
        <ProcessesList />
      </div>
    </article>
  );
};
