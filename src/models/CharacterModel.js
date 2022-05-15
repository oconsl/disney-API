import { DataTypes } from 'sequelize'
import { sequelize } from '../database/database.js'

export const Character = sequelize.define(
  'character',
  {
    characterId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    weight: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    history: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  },
  {
    timestamps: false
  }
)
