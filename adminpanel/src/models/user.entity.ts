import { DataTypes } from 'sequelize';

import sequelize from '../db/config.js';

export const User = sequelize.define(
  'Users',
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: { isEmail: true },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: 'user',
      validate: { isIn: [['user', 'admin']] },
    },
    firstName: {
      type: DataTypes.STRING,
      field: 'first_name',
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      field: 'is_verified',
    },
  },
  {
    timestamps: true,
    paranoid: true,
    underscored: true,
  },
);
