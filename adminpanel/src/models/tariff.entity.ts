import { DataTypes } from 'sequelize';
import sequelize from '../db/config.js';

export const Tariff = sequelize.define(
  'Tariff',
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    oldPrice: {
      type: DataTypes.FLOAT,
      allowNull: true,
      field: 'old_price',
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    showOnMainPage: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      field: 'show_on_main_page',
    },
  },
  {
    tableName: 'tariffs',
    timestamps: true,
    paranoid: true,
    underscored: true,
  }
);
