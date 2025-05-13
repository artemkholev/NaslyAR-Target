import { ResourceWithOptions } from 'adminjs';
import { Request } from '../models/request.entity.js';
import { components } from '../admin/component-loader.js';

const requestResource: ResourceWithOptions = {
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
        components: {
          list: components.StatusBadge,
          show: components.StatusBadge,
        },
      },
    },
  },
};

export default requestResource;
