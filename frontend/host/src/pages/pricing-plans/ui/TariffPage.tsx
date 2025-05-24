import React from "react";
import { useParams } from "react-router-dom"; // если React Router
import { useTranslation } from "react-i18next";

type Tariff = {
  title: string;
  price: string;
  oldPrice: string;
  description?: string;
  features: string[];
};

export const TariffPage = () => {
  const { id } = useParams<{ id: string }>(); // id - индекс или идентификатор тарифа
  const { t } = useTranslation();

  // Здесь тот же список тарифов — можно вынести в отдельный файл, чтобы не дублировать
  const tariffs: Tariff[] = [
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

  // Преобразуем id в число, если он есть
  const tariffIndex = id ? parseInt(id, 10) : NaN;

  if (isNaN(tariffIndex) || tariffIndex < 0 || tariffIndex >= tariffs.length) {
    return <p>Тариф не найден</p>;
  }

  const tariff = tariffs[tariffIndex];

  const onSubmit = () => {
    alert(`Заявка подана на тариф: ${tariff.title}`);
    // Здесь логика отправки заявки, API вызов и т.п.
  };

  return (
    <section className='page__box py-20 max-w-3xl mx-auto'>
      <h1 className='typography__title font-bold mb-6 text-center'>{tariff.title}</h1>

      <div className='bg-[var(--white-bg)] rounded-xl p-6 border border-[var(--main-stroke)] mb-8'>
        <div className='flex items-center justify-between mb-4'>
          <span className='typography__title'>{tariff.price}</span>
          <span className='typography__text line-through'>{tariff.oldPrice}</span>
        </div>

        {tariff.description && <p className='typography__text mb-6'>{tariff.description}</p>}

        <ul className='list-disc list-inside typography__text mb-8'>
          {tariff.features.map((feature, idx) => (
            <li key={idx}>{feature}</li>
          ))}
        </ul>

        <button onClick={onSubmit} className='button button--gradient w-full' type='button'>
          Подать заявку
        </button>
      </div>
    </section>
  );
};
