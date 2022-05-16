import { Character } from '../models/CharacterModel.js'
import { Genre } from '../models/GenreModel.js'
import { Op } from 'sequelize'

const movieController = (Movie) => {
  const getMovies = async (req, res, next) => {
    const { query } = req
    const validQuery = query.title || query.genre || query.order

    try {
      if (validQuery) {
        const response = await Movie.findAll({
          where: {
            [Op.or]: [
              { title: (query.title ??= null) },
              { genre: (query.genre ??= null) }
            ]
          },
          order: [['title', (query.order ??= 'ASC')]],
          attributes: ['imageUrl', 'title', 'creation', 'movieId']
        })

        const data = response.map((movie) => movie.toJSON())
        res.status(200).json(data)
      } else {
        const response = await Movie.findAll({
          attributes: ['imageUrl', 'title', 'creation', 'movieId']
        })
        const data = response.map((movie) => movie.dataValues)
        res.status(200).json(data)
      }
    } catch (err) {
      next(err)
    }
  }

  const postMovie = async (req, res, next) => {
    const { body } = req
    const { characters, genres } = body

    try {
      const newMovie = await Movie.create(body)

      const listOfCharacters = await Character.findAll()
      const listOfGenres = await Genre.findAll()

      listOfGenres.forEach(async (genre) => {
        if (genres.includes(genre.dataValues.name)) {
          await newMovie.addGenre(genre)
        }
      })

      listOfCharacters.forEach(async (character) => {
        if (characters.includes(character.dataValues.name))
          await newMovie.addCharacter(character)
      })

      res.status(201).send({ message: 'Movie created.' })
    } catch (err) {
      next(err)
    }
  }

  const getMovieById = async (req, res, next) => {
    const { params } = req

    try {
      const response = await Movie.findOne({
        where: {
          movieId: params.id
        },
        include: [
          {
            model: Character,
            as: 'characters',
            attributes: ['name'],
            through: {
              attributes: []
            }
          },
          {
            model: Genre,
            as: 'genres',
            attributes: ['name'],
            through: {
              attributes: []
            }
          }
        ]
      })

      res.status(200).json(response ?? null)
    } catch (err) {
      next(err)
    }
  }

  const putMovieById = async (req, res, next) => {
    const { params, body } = req
    const { characters, genres, imageUrl, title, creation, rate } = body

    try {
      const myMovie = await Movie.findOne({
        where: {
          movieId: params.id
        }
      })

      if (myMovie) {
        myMovie.imageUrl = imageUrl
        myMovie.title = title
        myMovie.creation = creation
        myMovie.rate = rate
      }

      await myMovie.setCharacters([])
      await myMovie.setGenres([])

      const listOfCharacters = await Character.findAll()
      const listOfGenres = await Genre.findAll()

      listOfGenres.forEach(async (genre) => {
        if (genres.includes(genre.dataValues.name)) {
          await myMovie.addGenre(genre)
        }
      })

      listOfCharacters.forEach(async (character) => {
        if (characters.includes(character.dataValues.name))
          await myMovie.addCharacter(character)
      })

      myMovie.save()

      res.status(200).send({ message: 'Movie updated.' })
    } catch (err) {
      next(err)
    }
  }

  const deleteMovieById = async (req, res, next) => {
    const { params } = req

    try {
      await Movie.destroy({
        where: {
          movieId: params.id
        }
      })
      res.status(200).send({ message: 'Movie deleted.' })
    } catch (err) {
      next(err)
    }
  }

  return {
    getMovies,
    postMovie,
    getMovieById,
    putMovieById,
    deleteMovieById
  }
}

export default movieController
