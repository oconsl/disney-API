import express from 'express'
import characterController from '../controllers/characterController.js'
import expressValidation from 'express-joi-validation'
import {
  bodyValidator,
  queryValidator,
  idValidator
} from '../validations/characterValidators.js'

const router = (Character) => {
  const characterRouter = express.Router()
  const validator = expressValidation.createValidator()

  const {
    getCharacters,
    postCharacter,
    getCharacterById,
    putCharacterById,
    deleteCharacterById
  } = characterController(Character)

  characterRouter
    .route('/characters')
    .get(validator.query(queryValidator), getCharacters)
    .post(validator.body(bodyValidator), postCharacter)

  characterRouter
    .route('/characters/:id')
    .get(validator.params(idValidator), getCharacterById)
    .put(validator.params(idValidator), putCharacterById)
    .delete(validator.params(idValidator), deleteCharacterById)

  return characterRouter
}

export default router
