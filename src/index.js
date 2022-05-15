import app from './app.js'
import { sequelize } from './database/database.js'

//DB sync
;(async () => {
  try {
    await sequelize.sync({ force: true })
    app()
  } catch (err) {
    console.error('Unable to connect to the database:', { cause: err.name })
  }
})()
