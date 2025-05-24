import { Tariff } from './tariff.entity.js';
import { TariffFeature } from './tariff-feature.entity.js';

Tariff.hasMany(TariffFeature, {
  foreignKey: 'tariff_id',
  as: 'features',
});

TariffFeature.belongsTo(Tariff, {
  foreignKey: 'tariff_id',
  as: 'tariff',
});
