import i18next from "i18next";
import { initReactI18next } from "react-i18next";

import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18next
  .use(Backend) // Загрузка переводов из файлов
  .use(LanguageDetector) // Автоматическое определение языка
  .use(initReactI18next) // Инициализация react-i18next
  .init({
    fallbackLng: 'ru', // Язык по умолчанию
    debug: true, // Режим отладки (только для разработки)
    interpolation: {
      escapeValue: false, // Не экранировать HTML
    },
    backend: {
      loadPath: '/locales/{{lng}}/{{lng}}.json', // Путь к файлам переводов
    },
  });

export default i18next;