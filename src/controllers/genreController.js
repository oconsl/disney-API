import { Movie } from '../models/MovieModel.js'

const genreController = (Genre) => {
  const getGenres = async (req, res, next) => {
    try {
      const response = await Genre.findAll()

      res.status(200).json(response)
    } catch (err) {
      next(err)
    }
  }

  const postGenre = async (req, res, next) => {
    const { body } = req
    const { movies } = body

    try {
      const newGenre = await Genre.create(body)

      const listOfMovies = await Movie.findAll()

      listOfMovies.forEach(async (movie) => {
        if (movies.includes(movie.dataValues.title))
          await newGenre.addMovie(movie)
      })

      res.status(201).send({ message: 'Genre created.' })
    } catch (err) {
      next(err)
    }
  }

  const putGenreById = async (req, res, next) => {
    const { params, body } = req
    const { movies, imageUrl, name } = body

    try {
      const myGenre = await Genre.findOne({ where: { genreId: params.id } })

      if (myGenre) {
        myGenre.imageUrl = imageUrl
        myGenre.name = name
      }

      await myGenre.setMovies([])

      const listOfMovies = await Movie.findAll()

      listOfMovies.forEach(async (movie) => {
        if (movies.includes(movie.dataValues.title))
          await myGenre.addMovie(movie)
      })

      myGenre.save()

      res.status(200).send({ message: 'Genre updated.' })
    } catch (err) {
      next(err)
    }
  }

  const deleteGenreById = async (req, res, next) => {
    const { params } = req

    try {
      await Genre.destroy({
        where: {
          genreId: params.id
        }
      })
      res.status(200).send({ message: 'Genre deleted.' })
    } catch (err) {
      next(err)
    }
  }

  return {
    getGenres,
    postGenre,
    putGenreById,
    deleteGenreById
  }
}

export default genreController
