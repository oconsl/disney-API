import express from 'express'
import userController from '../controllers/userController.js'

const router = (User) => {
  const userRouter = express.Router()

  const { login, register } = userController(User)

  userRouter.route('/auth/login').post(login)

  userRouter.route('/auth/register').post(register)

  return userRouter
}

export default router
