import i18next from "i18next";
import { initReactI18next } from "react-i18next";

import LanguageDetector from "i18next-browser-languagedetector";

import { ru } from "../../assets/locales/ru";

i18next
  .use(LanguageDetector) // Автоматическое определение языка
  .use(initReactI18next) // Инициализация react-i18next
  .init({
    fallbackLng: "ru", // Язык по умолчанию
    debug: false, // Режим отладки (только для разработки)
    interpolation: {
      escapeValue: false, // Не экранировать HTML
    },
    resources: {
      ru: { translation: ru },
    },
  });

export default i18next;
