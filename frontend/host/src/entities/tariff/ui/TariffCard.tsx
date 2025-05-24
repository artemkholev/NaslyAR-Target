import React from "react";
import { motion } from "framer-motion";
import PriceCheckMark from "@/shared/assets/images/main-page/price/check-mark.png";
import PriceArrow from "@/shared/assets/images/main-page/price/arrow.png";

type TariffCardProps = {
  title: string;
  price: string;
  oldPrice: string;
  description?: string;
  features: string[];
  selectText: string;
};

export const TariffCard: React.FC<TariffCardProps> = ({
  title,
  price,
  oldPrice,
  description,
  features,
  selectText,
}) => (
  <motion.div
    variants={{
      hidden: { opacity: 0, y: 50 },
      show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
    }}
    className='relative w-full max-w-sm bg-[var(--component-bg)] p-8 rounded-3xl shadow-regular hover:shadow-medium transition-shadow duration-300'>
    <h2 className='typography__title font-bold mb-4'>{title}</h2>

    <div className='flex items-center justify-between bg-[var(--white-bg)] rounded-full px-6 py-4 mb-4 border border-[var(--main-stroke)]'>
      <span className='typography__title'>{price}</span>
      <div className='typography__text flex items-center gap-1'>
        <span className='line-through'>{oldPrice}</span>
        <span>/мес</span>
      </div>
    </div>

    {description && (
      <div className='relative'>
        <div className='flex items-center gap-3 bg-[var(--white-bg)] p-4 rounded-xl border border-dashed border-[var(--main-stroke)] mb-4'>
          <img src={PriceCheckMark} alt='check' />
          <p className='typography__text'>{description}</p>
        </div>
        <img src={PriceArrow} alt='arrow' className='absolute -bottom-6 -left-12' />
      </div>
    )}

    <ul className='typography__text list-disc list-inside space-y-2 mb-6'>
      {features.map((f, i) => (
        <li key={i}>{f}</li>
      ))}
    </ul>

    <button className='button button--gradient w-full'>{selectText}</button>
  </motion.div>
);
