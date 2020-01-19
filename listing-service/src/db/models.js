import { Model, DataTypes } from 'sequelize';
import conn from './connection';

export class Listing extends Model {}

Listing.init(
  {
    title: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    description: {
      allowNull: false,
      type: DataTypes.TEXT,
    },
  },
  {
    sequelize: conn,
    modelName: 'listings',
  }
);
