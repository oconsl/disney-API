import dotenv from 'dotenv'
dotenv.config()
import { Sequelize } from 'sequelize'
const { USER, HOST, DB, PORT, PASSWORD } = process.env

export const sequelize = new Sequelize(DB, USER, PASSWORD, {
  host: HOST,
  port: PORT,
  dialect: 'postgres',
  logging: false
})
