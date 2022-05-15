import Joi from 'joi'

const alphaNumSpace = new RegExp('[a-z0-9\\s\\.]+$', 'i')
const UUID = new RegExp('[a-z0-9\\-]+$', 'i')

export const bodyValidator = Joi.object({
  imageUrl: Joi.string().required(),
  name: Joi.string().regex(alphaNumSpace).required(),
  movies: Joi.array()
    .items(Joi.string().regex(alphaNumSpace).required())
    .required()
})

export const queryValidator = Joi.object({})

export const idValidator = Joi.object({
  id: Joi.string().regex(UUID).min(36).max(36).required()
})
