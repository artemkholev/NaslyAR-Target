import { AdminJSOptions } from 'adminjs';
import componentLoader from './component-loader.js';
import { locale } from '../assets/i18n/ru.js';

// models
import { User } from '../models/user.entity.js';
import { Request } from '../models/request.entity.js';

const options: AdminJSOptions = {
  componentLoader,
  rootPath: '/admin',
  resources: [
    {
      resource: User,
      options: {
        id: 'Users',
      },
    },
    {
      resource: Request,
      options: {
        id: 'Requests',
        properties: {
          status: {
            availableValues: [
              { value: 'pending', label: 'В ожидании' },
              { value: 'approved', label: 'Одобрено' },
              { value: 'rejected', label: 'Отклонено' },
            ],
            type: 'select',
          },
        },
      },
    },
  ],
  databases: [],
  locale: {
    language: 'ru',
    translations: locale,
    availableLanguages: ['ru', 'en'],
  },
};

export default options;
