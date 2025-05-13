import { DataTypes } from 'sequelize';
import sequelize from '../db/config.js';

export const Request = sequelize.define(
  'Requests',
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id',
      },
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    niche: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 'pending',
      validate: {
        isIn: [['pending', 'approved', 'rejected']],
      },
    },
  },
  {
    timestamps: true,
    paranoid: true,
    underscored: true,
  }
);

(Request as any).associate = (models: any) => {
  Request.belongsTo(models.User, {
    foreignKey: 'user_id',
    as: 'users',
  });
};
