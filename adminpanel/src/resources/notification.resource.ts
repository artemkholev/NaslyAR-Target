import { Notification } from '../models/notification.entity.js';
import { components } from '../admin/component-loader.js';

const notificationResource = {
  resource: Notification,
  options: {
    id: 'Notifications',
    navigation: { name: 'Уведомления', icon: 'Notification' },
    properties: {
      status: {
        isVisible: { list: true, filter: true, show: true, edit: true },
      },
      is_read: {
        label: 'Прочитано',
        isVisible: { list: true, filter: true, show: true, edit: true },
        components: {
          list: components.BooleanIcon,
          show: components.BooleanIcon,
        },
      },
      created_at: {
        isVisible: { list: true, show: true },
        isDisabled: true,
      },
      updated_at: {
        isVisible: false,
      },
      deleted_at: {
        isVisible: false,
      },
    },
  },
};

export default notificationResource;
