import { ResourceWithOptions } from 'adminjs';
import { Tariff } from '../models/tariff.entity.js';

const tariffResource = {
  resource: Tariff,
  options: {
    id: 'Tariffs',
    listProperties: ['id', 'title', 'price', 'showOnMainPage'],
    showProperties: ['id', 'title', 'price', 'oldPrice', 'description', 'showOnMainPage', 'createdAt', 'updatedAt'],
    properties: {
      showOnMainPage: { type: 'boolean', label: 'Показывать на главной' },
    },
    actions: {
      show: {
        after: async (response, request, context) => {
          const { record } = context;
          if (record) {
            const features = await record.resource.sequelize.models.TariffFeature.findAll({
              where: { tariff_id: record.params.id },
            });
            record.params.features = features.map((f) => f.content);
          }
          return response;
        },
      },
    },
  },
};

export default tariffResource;
