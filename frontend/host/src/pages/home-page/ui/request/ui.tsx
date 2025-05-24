import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { AppRoutes } from "@/app/router";

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8 } },
};

export const Request = () => {
  return (
    <section
      id='request'
      className='flex flex-col items-center justify-center py-16  gap-5 shadow-lg'>
      <motion.h1
        className='typography__title text-center font-semibold text-2xl text-black max-w-2xl px-6'
        variants={fadeIn}
        initial='hidden'
        animate='visible'>
        Готовы запустить вашу рекламу в космос? Начнем прямо сейчас!
      </motion.h1>
      <motion.p
        className='typography__text text-center text-gray-600 mt-6 px-6 max-w-xl'
        variants={fadeIn}
        initial='hidden'
        animate='visible'
        transition={{ duration: 1, delay: 0.3 }}>
        Мы создадим рекламную кампанию, которая выйдет за пределы обычных решений. Давайте обсудим,
        как таргетинг может работать для вашего бизнеса.
      </motion.p>
      <Link to={AppRoutes.ABOUT_TARGET}>
        <motion.button
          className='button button--gradient'
          variants={fadeIn}
          initial='hidden'
          animate='visible'
          transition={{ duration: 1, delay: 0.5 }}>
          Узнать подробнее
        </motion.button>
      </Link>
    </section>
  );
};
