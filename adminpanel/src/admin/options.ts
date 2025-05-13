import { AdminJSOptions } from 'adminjs';
import componentLoader from './component-loader.js';
import { locale } from '../assets/i18n/ru.js';
import { components } from './component-loader.js';

// resources
import userResource from '../resources/user.resource.js';
import requestResource from '../resources/request.resource.js';
import notificationResource from '../resources/notification.resource.js';

const options: AdminJSOptions = {
  componentLoader,
  rootPath: '/admin',
  resources: [userResource, requestResource, notificationResource],
  dashboard: {
    component: components.Dashboard,
  },
  databases: [],
  locale: {
    language: 'ru',
    translations: locale,
    availableLanguages: ['ru', 'en'],
  },
  branding: {
    companyName: 'NuslyAR | Target',
    logo: '/public/logo.png',
    favicon: '/public/logo.ico',
    theme: {
      colors: {
        // Основной фон
        bg: '#fefef4', // green.10
        // Карточки, панели
        container: '#f0f0e4', // green.20
        // Основной текст
        defaultText: '#4A3728', // black.900
        lightText: '#5C4033', // black.800
        // Кнопка
        primary100: '#7da662', // hover
        primary80: '#639149', // active
        primary60: '#5c7f40',
        primary40: '#4c6836',
        primary20: '#3b522b',
        // Успех, ошибка
        success: '#7da662',
        error: '#D32F2F',
        // Рамки
        border: '#D9D9D9',
        // Белый фон, например, для кнопок
        inputBorder: '#D9D9D9',
        accent: '#6A8D73',
      },
    },
  },
};

export default options;
