import { DataTypes } from 'sequelize';
import sequelize from '../db/config.js';

export const TariffFeature = sequelize.define(
  'TariffFeature',
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    tariff_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: 'tariff_features',
    timestamps: true,
    paranoid: true,
    underscored: true,
  },
);
