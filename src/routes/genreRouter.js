import express from 'express'
import genreController from '../controllers/genreController.js'
import expressValidation from 'express-joi-validation'
import {
  bodyValidator,
  queryValidator,
  idValidator
} from '../validations/genreValidators.js'

const routes = (Genre) => {
  const genreRouter = express.Router()
  const validator = expressValidation.createValidator()

  const { getGenres, postGenre, putGenreById, deleteGenreById } =
    genreController(Genre)

  genreRouter
    .route('/genres')
    .get(validator.query(queryValidator), getGenres)
    .post(validator.body(bodyValidator), postGenre)

  genreRouter
    .route('/genres/:id')
    .put(validator.params(idValidator), putGenreById)
    .delete(validator.params(idValidator), deleteGenreById)

  return genreRouter
}

export default routes
