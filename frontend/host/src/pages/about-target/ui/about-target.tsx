import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Target, TrendingUp, Lightbulb, CheckCircle, Briefcase, Activity } from "lucide-react";

const AboutTargetPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className='max-w-5xl mx-auto bg-[--component-bg] rounded-3xl p-10'>
      {/* Заголовок */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className='typography__title font-bold text-center mb-10'>
        О таргетированной рекламе
      </motion.h1>

      {/* Вступление */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className='typography__text mb-10 text-center'>
        Таргетированная реклама — это мощный инструмент, который позволяет показывать объявления
        строго нужной аудитории, повышая продажи, узнаваемость и вовлечённость.
      </motion.p>

      {/* Два основных блока */}
      <div className='grid md:grid-cols-2 gap-8 mb-12'>
        <motion.div
          whileHover={{ scale: 1.05 }}
          className='bg-gradient-to-br from-[#ffffff] to-[#f9fafb] p-6 rounded-2xl shadow-lg border'>
          <div className='flex items-center gap-3 mb-4'>
            <Target className='text-green-600' size={24} />
            <h2 className='typography__title font-semibold'>Что делает таргетолог?</h2>
          </div>
          <ul className='list-disc pl-6 typography__text space-y-1'>
            <li>Настраивает рекламные кампании</li>
            <li>Анализирует поведение аудитории</li>
            <li>Оптимизирует бюджет</li>
            <li>Повышает конверсию</li>
          </ul>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className='bg-gradient-to-br from-[#ffffff] to-[#f9fafb] p-6 rounded-2xl shadow-lg border'>
          <div className='flex items-center gap-3 mb-4'>
            <TrendingUp className='text-blue-600' size={24} />
            <h2 className='typography__title font-semibold'>Почему это важно?</h2>
          </div>
          <p className='typography__text'>
            Реклама, направленная на нужную аудиторию, в разы эффективнее. Она экономит бюджет и
            даёт ощутимые результаты.
          </p>
        </motion.div>
      </div>

      {/* Преимущества */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        viewport={{ once: true }}
        className='mb-12'>
        <h2 className='typography__title font-semibold mb-4 flex items-center gap-2'>
          <CheckCircle className='text-green-500' /> Преимущества
        </h2>
        <ul className='list-disc pl-6 typography__text space-y-1'>
          <li>Высокая рентабельность инвестиций (ROI)</li>
          <li>Гибкость и масштабируемость рекламных кампаний</li>
          <li>Точное таргетирование по полу, возрасту, интересам</li>
          <li>Возможность A/B тестирования и быстрой адаптации</li>
        </ul>
      </motion.div>

      {/* Сферы применения */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        viewport={{ once: true }}
        className='mb-12'>
        <h2 className='typography__title font-semibold mb-4 flex items-center gap-2'>
          <Briefcase className='text-blue-500' /> Где используется?
        </h2>
        <div className='grid sm:grid-cols-2 gap-4 typography__text'>
          <div>🏥 Медицинские и косметологические клиники</div>
          <div>🎓 Онлайн-курсы и образовательные платформы</div>
          <div>🛍️ Интернет-магазины и маркетплейсы</div>
          <div>🏋️‍♀️ Фитнес-клубы и тренеры</div>
          <div>✈️ Туризм и отдых</div>
          <div>💼 B2B-продукты и сервисы</div>
        </div>
      </motion.div>

      {/* Этапы работы */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        viewport={{ once: true }}
        className='mb-12'>
        <h2 className='typography__title font-semibold mb-4 flex items-center gap-2'>
          <Activity className='text-purple-500' /> Этапы работы таргетолога
        </h2>
        <ol className='list-decimal pl-6 typography__text space-y-1'>
          <li>Анализ целевой аудитории</li>
          <li>Подготовка креативов (тексты, баннеры, видео)</li>
          <li>Настройка кампаний в рекламном кабинете</li>
          <li>Запуск и контроль результатов</li>
          <li>Аналитика и оптимизация</li>
        </ol>
      </motion.div>

      {/* Интересный факт */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className='bg-gradient-to-r from-green-900 to-green-100 p-6 rounded-2xl shadow-xl text-white mb-10'>
        <div className='flex items-center gap-3 mb-2'>
          <Lightbulb size={22} />
          <h3 className='typography__title font-medium'>Интересный факт:</h3>
        </div>
        <p className='typography__text !text-white'>
          Facebook, Instagram, Avito используют более{" "}
          <span className='font-bold underline'>50 параметров</span> для таргетинга: от интересов до
          поведения и геолокации.
        </p>
      </motion.div>

      {/* Завершение */}
      <div className='text-center mt-8'>
        <p className='typography__text mb-4'>
          Хотите привлечь больше клиентов и увеличить продажи?
        </p>
        <button className='button'>Связаться с таргетологом</button>
      </div>
    </motion.div>
  );
};

export default AboutTargetPage;
