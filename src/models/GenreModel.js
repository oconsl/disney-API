import { DataTypes } from 'sequelize'
import { sequelize } from '../database/database.js'

export const Genre = sequelize.define(
  'genre',
  {
    genreId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    timestamps: false
  }
)
