import { ResourceWithOptions } from 'adminjs';
import { User } from '../models/user.entity.js';

const userResource: ResourceWithOptions = {
  resource: User,
  options: {
    id: 'Users',
    properties: {
      password: {
        type: 'password',
        isVisible: {
          list: false,
          edit: true,
          filter: false,
          show: false,
        },
      },
    },
  },
};

export default userResource;
