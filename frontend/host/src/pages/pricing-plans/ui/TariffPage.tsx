import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchTariffById, type Tariff } from "@/entities/tariff";
import { Check, ArrowRight, Star, Zap, Shield, Clock, Gift } from "lucide-react";

const TariffPage = () => {
  const { id } = useParams<{ id: string }>();
  const [tariff, setTariff] = useState<Tariff | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const loadTariff = async () => {
      try {
        setIsLoading(true);
        const data = await fetchTariffById(id);
        setTariff(data);
      } catch (err) {
        console.error("Failed to load tariff:", err);
      } finally {
        setIsLoading(false);
      }
    };

    loadTariff();
  }, [id]);

  const onSubmit = () => {
    alert(`Заявка подана на тариф: ${tariff?.title}`);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--text-green)]"></div>
      </div>
    );
  }

  if (!tariff) {
    return <div className="text-center py-12 text-[var(--text-red)]">Тариф не найден</div>;
  }

  return (
    <section className="py-12 max-w-6xl mx-auto px-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Основная информация о тарифе */}
        <div className="lg:col-span-2">
          <div className="bg-[var(--white-bg)] rounded-xl p-6 mb-6 border border-[var(--main-stroke)] shadow-regular">
            <div className="flex items-center justify-between mb-4">
              <h1 className="typography__title font-bold">{tariff.title}</h1>
              {tariff.popular && (
                <span className="bg-[var(--orange-50)] text-[var(--text-primary)] px-3 py-1 rounded-full text-sm font-medium flex items-center">
                  <Star className="w-4 h-4 mr-1" /> Популярный
                </span>
              )}
            </div>

            <div className="bg-[var(--green-20)] rounded-lg p-4 mb-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-end">
                <div>
                  <span className="text-3xl font-bold text-[var(--text-green)]">{tariff.price} ₽</span>
                  {tariff.oldPrice && (
                    <span className="text-lg text-[var(--text-tertiary)] line-through ml-2">{tariff.oldPrice} ₽</span>
                  )}
                  <p className="typography__meta mt-1">в месяц</p>
                </div>
              </div>
            </div>

            {tariff.description && (
              <div className="mb-6">
                <p className="typography__text">{tariff.description}</p>
              </div>
            )}

            <div className="mb-6">
              <h2 className="typography__title font-semibold mb-3">Что входит в тариф:</h2>
              <ul className="space-y-2">
                {tariff.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start">
                    <Check className="flex-shrink-0 w-5 h-5 text-[var(--text-green)] mt-0.5 mr-2" />
                    <span className="typography__text">{feature.content}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="bg-[var(--blue-100)] p-3 rounded-lg flex items-start">
                <Shield className="w-5 h-5 text-[var(--blue-800)] mr-2 mt-0.5" />
                <div>
                  <h3 className="typography__text--secondary font-medium">Гарантия безопасности</h3>
                  <p className="typography__meta">Все данные надежно защищены</p>
                </div>
              </div>
              <div className="bg-[var(--purple-50)] p-3 rounded-lg flex items-start">
                <Clock className="w-5 h-5 text-[var(--purple-100)] mr-2 mt-0.5" />
                <div>
                  <h3 className="typography__text--secondary font-medium">Круглосуточная поддержка</h3>
                  <p className="typography__meta">Помощь 24/7</p>
                </div>
              </div>
            </div>
          </div>

          {/* Дополнительная информация */}
          <div className="bg-[var(--white-bg)] rounded-xl p-6 border border-[var(--main-stroke)] shadow-regular">
            <h2 className="typography__title font-bold mb-4">Часто задаваемые вопросы</h2>
            
            <div className="space-y-4">
              <div className="border-b border-[var(--main-stroke)] pb-3">
                <h3 className="typography__text--secondary font-medium">Можно ли изменить тариф позже?</h3>
                <p className="typography__meta mt-1">Да, вы можете изменить тариф в любой момент в личном кабинете.</p>
              </div>
              <div className="border-b border-[var(--main-stroke)] pb-3">
                <h3 className="typography__text--secondary font-medium">Есть ли пробный период?</h3>
                <p className="typography__meta mt-1">Мы предлагаем 14-дневный пробный период для всех новых пользователей.</p>
              </div>
              <div>
                <h3 className="typography__text--secondary font-medium">Как происходит оплата?</h3>
                <p className="typography__meta mt-1">Оплата происходит автоматически каждый месяц с привязанной карты.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Боковая панель с кнопкой и бонусами */}
        <div>
          <div className="bg-[var(--white-bg)] rounded-xl p-6 sticky top-6 border border-[var(--main-stroke)] shadow-regular">
            <div className="text-center mb-4">
              <h3 className="typography__title font-bold mb-1">Вы выбрали</h3>
              <p className="text-[var(--text-green)] font-medium">{tariff.title}</p>
            </div>

            <button
              onClick={onSubmit}
              className="w-full bg-[var(--button-primary-enabled)] hover:bg-[var(--button-primary-click)] text-white font-bold py-3 px-4 rounded-lg transition-all flex items-center justify-center"
            >
              Оформить подписку
              <ArrowRight className="w-5 h-5 ml-2" />
            </button>

            <div className="mt-4 border-t border-[var(--main-stroke)] pt-4">
              <h4 className="typography__text--secondary font-medium mb-2 flex items-center">
                <Gift className="w-5 h-5 text-[var(--orange-900)] mr-2" />
                Ваши бонусы:
              </h4>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <Zap className="w-4 h-4 text-[var(--text-green)] mr-2" />
                  <span className="typography__text">+2 месяца бесплатно при годовой подписке</span>
                </li>
                <li className="flex items-center">
                  <Zap className="w-4 h-4 text-[var(--text-green)] mr-2" />
                  <span className="typography__text">Бесплатный персональный консультант</span>
                </li>
                <li className="flex items-center">
                  <Zap className="w-4 h-4 text-[var(--text-green)] mr-2" />
                  <span className="typography__text">Доступ к закрытым вебинарам</span>
                </li>
              </ul>
            </div>

            <div className="mt-4 bg-[var(--orange-50)] border border-[var(--orange-900)] rounded-lg p-3">
              <h4 className="typography__text--secondary font-medium mb-1">Специальное предложение</h4>
              <p className="typography__meta">
                При оформлении сегодня — скидка 15% на первые 3 месяца!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TariffPage;