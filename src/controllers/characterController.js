import { Movie } from '../models/MovieModel.js'
import { Op } from 'sequelize'

const characterController = (Character) => {
  const getCharacters = async (req, res, next) => {
    const { query } = req
    const validQuery = query.name || query.age || query.weight

    try {
      if (validQuery) {
        const response = await Character.findAll({
          where: {
            [Op.or]: [
              { name: (query.name ??= null) },
              { age: (query.age ??= null) },
              { weight: (query.weight ??= null) }
            ]
          },
          attributes: ['imageUrl', 'name', 'characterId']
        })

        const data = response.map((character) => character.toJSON())
        res.status(200).json(data)
      } else {
        const response = await Character.findAll({
          attributes: ['imageUrl', 'name', 'characterId']
        })

        const data = response.map((character) => character.toJSON())
        res.status(200).json(data)
      }
    } catch (err) {
      next(err)
    }
  }

  const postCharacter = async (req, res, next) => {
    const { body } = req
    const { movies } = body

    try {
      const newCharacter = await Character.create(body)

      const listOfMovies = await Movie.findAll()

      listOfMovies.forEach(async (movie) => {
        if (movies.includes(movie.dataValues.title))
          await newCharacter.addMovie(movie)
      })

      res.status(201).send({ message: 'Character created.' })
    } catch (err) {
      next(err)
    }
  }

  const getCharacterById = async (req, res, next) => {
    const { params } = req

    try {
      const response = await Character.findOne({
        where: {
          characterId: params.id
        },
        include: [
          {
            model: Movie,
            as: 'movies',
            attributes: ['title'],
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

  const putCharacterById = async (req, res, next) => {
    const { params, body } = req

    try {
      await Character.update(body, {
        where: {
          characterId: params.id
        }
      })
      res.status(200).send({ message: 'Character updated.' })
    } catch (err) {
      next(err)
    }
  }

  const deleteCharacterById = async (req, res, next) => {
    const { params } = req

    try {
      await Character.destroy({
        where: {
          characterId: params.id
        }
      })
      res.status(200).send({ message: 'Character deleted.' })
    } catch (err) {
      next(err)
    }
  }

  return {
    getCharacters,
    postCharacter,
    getCharacterById,
    putCharacterById,
    deleteCharacterById
  }
}

export default characterController
