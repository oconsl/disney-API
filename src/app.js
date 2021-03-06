import express from 'express'
import cors from 'cors'
import { expressjwt } from 'express-jwt'
import { Character, Genre, Movie, User } from './models/index.js'
import {
  characterRouter,
  genreRouter,
  movieRouter,
  userRouter
} from './routes/index.js'
import dotenv from 'dotenv'
dotenv.config()
import errorHandler from './middleware/errorHandler.js'

const SERVER_PORT = process.env.SERVER_PORT || 3000
const app = express()

//DB Sync
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.all(
  '/*',
  expressjwt({
    secret: process.env.JWT_SECRET,
    algorithms: ['HS256']
  }).unless({ path: ['/auth/login', '/auth/register'] })
)

app.use((err, _, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({
      error: err.name,
      cause: 'Unauthorized. Missing or invalid token provided.'
    })
  } else {
    next(err)
  }
})

app.use(
  '/',
  userRouter(User),
  characterRouter(Character),
  genreRouter(Genre),
  movieRouter(Movie)
)

app.use(errorHandler)

app.listen(SERVER_PORT, () => {
  console.log(`Server is running on port ${SERVER_PORT}`)
})

// for test
export default app

// Author: Ocón, Santiago Luis
