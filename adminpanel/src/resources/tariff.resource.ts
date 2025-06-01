import { ResourceWithOptions } from 'adminjs';
import { Tariff } from '../models/tariff.entity.js';
import sequelize from '../db/config.js';
import { components } from '../admin/component-loader.js';

const tariffResource: ResourceWithOptions = {
  resource: Tariff,
  options: {
    listProperties: ['id', 'title', 'price', 'showOnMainPage'],
    showProperties: ['id', 'title', 'price', 'oldPrice', 'description', 'showOnMainPage', 'features'],
    editProperties: ['title', 'price', 'oldPrice', 'description', 'showOnMainPage', 'features'],

    properties: {
      features: {
        type: 'mixed',
        isVisible: { list: false, filter: false, show: true, edit: true },
        components: {
          edit: components.FeaturesEdit,
          show: components.FeaturesShow,
        },
      },
    },

    actions: {
      new: {
        before: async (request) => {
          if (request.payload?.features) {
            try {
              request.payload._features = JSON.parse(request.payload.features);
            } catch (e) {
              request.payload._features = [];
            }
            delete request.payload.features;
          }
          return request;
        },
        after: async (response, request, context) => {
          const { record } = context;
          if (record && request.payload?._features) {
            await sequelize.models.TariffFeature.destroy({ where: { tariff_id: record.params.id } });
            for (const content of request.payload._features) {
              await sequelize.models.TariffFeature.create({ tariff_id: record.params.id, content });
            }
          }
          return response;
        },
      },
      edit: {
        before: async (request) => {
          if (request.payload?.features) {
            try {
              request.payload._features = JSON.parse(request.payload.features);
            } catch (e) {
              request.payload._features = [];
            }
            delete request.payload.features;
          }
          return request;
        },
        after: async (response, request, context) => {
          const { record } = context;
          if (record && request.payload?._features) {
            await sequelize.models.TariffFeature.destroy({ where: { tariff_id: record.params.id } });
            for (const content of request.payload._features) {
              await sequelize.models.TariffFeature.create({ tariff_id: record.params.id, content });
            }
          }
          return response;
        },
      },
      show: {
        after: async (response, request, context) => {
          const { record } = context;
          if (record) {
            const features = await sequelize.models.TariffFeature.findAll({
              where: { tariff_id: record.params.id },
            });
            record.params.features = JSON.stringify(features.map((f) => f.get('content')));
          }
          return response;
        },
      },
    },
  },
};

export default tariffResource;
