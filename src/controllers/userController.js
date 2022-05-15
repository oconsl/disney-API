import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import sgMail from '@sendgrid/mail'

const userController = (User) => {
  const login = async (req, res, next) => {
    const { email, password } = req.body

    try {
      const user = await User.findOne({
        where: {
          email
        }
      })

      if (user !== null && (await bcrypt.compare(password, user.password))) {
        const token = await generateToken(user)

        res.status(200).json({ message: 'User logged in', token: token })
      } else {
        res.status(401).send({ message: 'Invalid credentials' })
      }
    } catch (err) {
      next(err)
    }
  }

  const register = async (req, res, next) => {
    const { body } = req
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)
    const message = {
      to: body.email,
      from: process.env.OWNER_EMAIL,
      subject: 'Welcome to Disney API',
      template_id: 'd-b388c48df07c494bb89bb183cbbfa89d',
      dynamicTemplateData: {
        subject: 'Welcome to Disney API'
      }
    }

    try {
      body.password = await bcrypt.hash(body.password, 10)

      await User.create(body)

      sgMail
        .send(message)
        .then(() => console.log('Email sent'))
        .catch((err) => console.log(err.response.body))

      res.status(201).send({ message: 'User created' })
    } catch (err) {
      next(err)
    }
  }

  const generateToken = async (user) => {
    const token = jwt.sign(
      {
        email: user.email
      },
      process.env.JWT_SECRET,
      { expiresIn: '3d' }
    )

    return token
  }

  return { login, register }
}

export default userController
