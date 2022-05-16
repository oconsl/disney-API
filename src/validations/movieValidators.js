import Joi from 'joi'

const alphaNumSpace = new RegExp('[a-z0-9\\s\\.]+$', 'i')
const UUID = new RegExp('[a-z0-9\\-]+$', 'i')

export const bodyValidator = Joi.object({
  imageUrl: Joi.string().required(),
  title: Joi.string().regex(alphaNumSpace).required(),
  creation: Joi.date().required(),
  rate: Joi.number().min(1).max(5).required(),
  characters: Joi.array()
    .items(Joi.string().regex(alphaNumSpace).required())
    .required(),
  genres: Joi.array()
    .items(Joi.string().regex(alphaNumSpace).required())
    .required()
})

export const queryValidator = Joi.alternatives().try(
  Joi.object({
    title: Joi.string().required()
  }),
  Joi.object({
    genre: Joi.string().required()
  }),
  Joi.object({
    order: Joi.string().required()
  }),
  Joi.object({})
)

export const idValidator = Joi.object({
  id: Joi.string().regex(UUID).min(36).max(36).required()
})
