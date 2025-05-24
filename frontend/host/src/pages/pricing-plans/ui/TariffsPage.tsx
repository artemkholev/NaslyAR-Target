import React from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

import { TariffCard } from "@/entities/tariff";

export const TariffsPage = () => {
  const { t } = useTranslation();

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
          <TariffCard
            key={index}
            title={tariff.title}
            price={tariff.price}
            oldPrice={tariff.oldPrice}
            description={tariff.description}
            features={tariff.features}
            selectText={t("home_page.price.select")}
          />
        ))}
      </motion.div>
    </section>
  );
};
