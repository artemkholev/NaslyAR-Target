import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Check, ArrowRight, Sparkles } from "lucide-react";
import { fetchMainTariffs, type Tariff } from "@/entities/tariff";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "@/app/router";

export const Price = () => {
  const { t } = useTranslation();
  const [tariffs, setTariffs] = useState<Tariff[]>([]);
  const navigate = useNavigate();

  const handleSelectTariff = (tariffId: string) => {
    navigate(`${AppRoutes.TARIFF.replace(":id", tariffId)}`);
  };

  useEffect(() => {
    const loadTariffs = async () => {
      try {
        const data = await fetchMainTariffs();
        setTariffs(data);
      } catch (err) {
        console.error("Failed to load tariffs:", err);
      }
    };
    loadTariffs();
  }, [t]);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
    hover: {
      y: -8,
      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.08)",
    },
  };

  return (
    <section id='price' className='relative py-24 bg-[var(--main-bg)] overflow-hidden'>
      {/* Декоративные элементы */}
      <div className='absolute inset-0 overflow-hidden opacity-10 pointer-events-none'>
        <div className='absolute top-20 left-10 w-64 h-64 bg-[var(--text-green)] rounded-full filter blur-[80px]'></div>
        <div className='absolute bottom-10 right-10 w-72 h-72 bg-[var(--text-green)] rounded-full filter blur-[80px]'></div>
      </div>

      <div className='container mx-auto px-4 relative z-10'>
        {/* Заголовок */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className='text-center max-w-3xl mx-auto mb-16'>
          <h2 className='typography__title font-bold text-[var(--text-primary)] mb-6'>
            <span className='relative inline-block'>
              {t("home_page.price.title")}
              <Sparkles className='absolute -top-4 -right-6 w-5 h-5 text-[var(--text-green)]' />
            </span>
          </h2>
          <div className='typography__text text-[var(--text-secondary)]'>
            <p>{t("home_page.price.meta_1")}</p>
            <p className='text-[var(--text-green)] font-medium'>{t("home_page.price.meta_2")}</p>
          </div>
        </motion.div>

        {/* Карточки */}
        {tariffs.length > 0 ? (
          <motion.div
            variants={containerVariants}
            initial='hidden'
            whileInView='show'
            viewport={{ once: true }}
            className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {tariffs.map((tariff, index) => (
              <motion.div
                key={tariff.id || index}
                variants={cardVariants}
                whileHover='hover'
                className='relative bg-[var(--component-bg)] rounded-2xl overflow-hidden border border-[var(--main-stroke)] hover:border-[var(--text-green)] transition-all'>
                {/* Акцентная полоса */}
                <div className='absolute top-0 left-0 w-full h-1 bg-[var(--text-green)]'></div>

                <div className='h-full flex flex-col p-8'>
                  {/* Заголовок карточки */}
                  <div className='mb-6'>
                    <h3 className='typography__title font-bold text-[var(--text-primary)] mb-2'>
                      {tariff.title}
                    </h3>
                    {tariff.description && (
                      <p className='typography__text text-[var(--text-secondary)]'>
                        {tariff.description}
                      </p>
                    )}
                  </div>

                  {/* Цена */}
                  <div className='relative mb-8'>
                    <div className='bg-[var(--white-bg)] rounded-xl p-5 border border-[var(--main-stroke)]'>
                      <div className='flex items-end justify-between'>
                        <span className='typography__title text-[var(--text-green)]'>
                          {tariff.price}
                        </span>
                        {tariff.oldPrice && (
                          <span className='typography__text text-[var(--text-secondary)] line-through'>
                            {tariff.oldPrice}
                          </span>
                        )}
                      </div>
                      <p className='typography__meta text-[var(--text-tertiary)] mt-1'>
                        {t("home_page.price.period")}
                      </p>
                    </div>
                    <div className='absolute -bottom-3 -left-3 w-6 h-6 bg-[var(--text-green)] rounded-full'></div>
                  </div>

                  {/* Особенности */}
                  <ul className='space-y-3 mb-8 flex-grow pl-2'>
                    {tariff.features?.map((feature, idx) => (
                      <li key={idx} className='flex items-start gap-3'>
                        <div className='relative mt-1'>
                          <Check className='w-5 h-5 text-[var(--text-green)] flex-shrink-0' />
                        </div>
                        <span className='typography__text text-[var(--text-primary)]'>
                          {feature.content}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* Кнопка */}
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => tariff.id && handleSelectTariff(tariff.id)}
                    className='button button--gradient w-full flex items-center justify-center gap-2 py-4 rounded-lg overflow-hidden relative group'>
                    <span className='relative z-10'>{t("home_page.price.select")}</span>
                    <ArrowRight className='w-5 h-5 z-10' />
                    <div className='absolute inset-0 bg-[var(--button-primary-enabled)] group-hover:bg-[var(--button-primary-click)] transition-colors'></div>
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className='typography__text text-center py-12 text-[var(--text-secondary)]'>
            {t("home_page.price.no_tariffs")}
          </div>
        )}
      </div>
    </section>
  );
};
