import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import ruLibrary from "../../../../public/locales/ru/library.json";

// Инициализация i18next
i18n
  .use(initReactI18next) // Подключаем react-i18next
  .init({
    resources: {
      ru: {
        library: ruLibrary,
      },
    },
    lng: "ru", // Язык по умолчанию
    fallbackLng: "ru", // Язык, если текущий не найден
    interpolation: {
      escapeValue: false, // React уже обрабатывает экранирование
    },
    defaultNS: "library", // namespace по умолчанию
  });

export default i18n;
