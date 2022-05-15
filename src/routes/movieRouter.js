import express from 'express'
import movieController from '../controllers/movieController.js'
import expressValidation from 'express-joi-validation'
import {
  bodyValidator,
  queryValidator,
  idValidator
} from '../validations/movieValidators.js'

const routes = (Movie) => {
  const movieRouter = express.Router()
  const validator = expressValidation.createValidator()

  const { getMovies, postMovie, getMovieById, putMovieById, deleteMovieById } =
    movieController(Movie)

  movieRouter
    .route('/movies')
    .get(validator.query(queryValidator), getMovies)
    .post(validator.body(bodyValidator), postMovie)

  movieRouter
    .route('/movies/:id')
    .get(validator.params(idValidator), getMovieById)
    .put(validator.params(idValidator), putMovieById)
    .delete(validator.params(idValidator), deleteMovieById)

  return movieRouter
}

export default routes
