import React from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

import PriceCheckMark from "@/shared/assets/images/main-page/price/check-mark.png";
import PriceArrow from "@/shared/assets/images/main-page/price/arrow.png";

export const Price = () => {
  const { t } = useTranslation("library");

  const tariffs = [
    {
      title: t("home_page.price.tariff_1.title"),
      price: t("home_page.price.tariff_1.price"),
      oldPrice: t("home_page.price.tariff_1.price_not"),
      features: [
        t("home_page.price.tariff_1.li_1"),
        t("home_page.price.tariff_1.li_2"),
        t("home_page.price.tariff_1.li_3"),
        t("home_page.price.tariff_1.li_4"),
        t("home_page.price.tariff_1.li_5"),
      ],
    },
    {
      title: t("home_page.price.tariff_2.title"),
      price: t("home_page.price.tariff_2.price"),
      oldPrice: t("home_page.price.tariff_2.price_not"),
      description: t("home_page.price.tariff_2.discription"),
      features: [
        t("home_page.price.tariff_2.li_1"),
        t("home_page.price.tariff_2.li_2"),
        t("home_page.price.tariff_2.li_3"),
        t("home_page.price.tariff_2.li_4"),
      ],
    },
    {
      title: t("home_page.price.tariff_3.title"),
      price: t("home_page.price.tariff_3.price"),
      oldPrice: t("home_page.price.tariff_2.price_not"),
      description: t("home_page.price.tariff_2.discription"),
      features: [
        t("home_page.price.tariff_3.li_1"),
        t("home_page.price.tariff_3.li_2"),
        t("home_page.price.tariff_3.li_3"),
        t("home_page.price.tariff_3.li_4"),
        t("home_page.price.tariff_3.li_5"),
        t("home_page.price.tariff_3.li_6"),
        t("home_page.price.tariff_3.li_7"),
      ],
    },
  ];

  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <section id='price' className='relative page__box py-20'>
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        className='typography__title font-bold mb-6 text-center'>
        {t("home_page.price.title")}
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        className='typography__text max-w-3xl mx-auto text-center mb-16'>
        <p>{t("home_page.price.meta_1")}</p>
        <p>{t("home_page.price.meta_2")}</p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial='hidden'
        whileInView='show'
        viewport={{ once: true, amount: 0.2 }}
        className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-10 place-items-center'>
        {tariffs.map((tariff, index) => (
          <motion.div
            key={index}
            variants={cardVariants}
            className='relative w-full max-w-sm bg-[var(--component-bg)] p-8 rounded-3xl shadow-regular hover:shadow-medium transition-shadow duration-300'>
            <h2 className='typography__title font-bold mb-4'>{tariff.title}</h2>

            <div className='flex items-center justify-between bg-[var(--white-bg)] rounded-full px-6 py-4 mb-4 border border-[var(--main-stroke)]'>
              <span className='typography__title'>{tariff.price}</span>
              <div className='typography__text flex items-center gap-1'>
                <span className='line-through'>{tariff.oldPrice}</span>
                <span>{t("home_page.price.period")}</span>
              </div>
            </div>

            {tariff.description && (
              <div className="relative">
                <div className='flex items-center gap-3 bg-[var(--white-bg)] p-4 rounded-xl border border-dashed border-[var(--main-stroke)] mb-4'>
                  <img src={PriceCheckMark} alt='check' />
                  <p className='typography__text'>{tariff.description}</p>
                </div>

                <img
                  src={PriceArrow}
                  alt='arrow'
                  className='absolute -bottom-6 -left-12'
                />
              </div>
            )}

            <ul className='typography__text list-disc list-inside space-y-2 mb-6'>
              {tariff.features.map((feature, idx) => (
                <li key={idx}>{feature}</li>
              ))}
            </ul>

            <button className='button button--gradient w-full'>
              {t("home_page.price.select")}
            </button>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};
