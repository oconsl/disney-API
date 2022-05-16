import { Movie } from '../models/MovieModel.js'

const QUERY_HANDLER = {
  name: (queryData, query) => (queryData.name = query.name),
  age: (queryData, query) => (queryData.age = query.age),
  weight: (queryData, query) => (queryData.weight = query.weight),
  movies: (queryData, query) => (queryData.movies = query.movies),
  defaultQuery: (queryData, _) => queryData
}

const characterController = (Character) => {
  const getCharacters = async (req, res, next) => {
    const { query } = req
    const queryData = {}
    const handler =
      QUERY_HANDLER[Object.keys(query)[0]] || QUERY_HANDLER.defaultQuery
    handler(queryData, query)

    try {
      switch (Object.keys(queryData)[0]) {
        case 'name':
        case 'age':
        case 'weight': {
          const response = await Character.findAll({
            where: queryData,
            attributes: ['imageUrl', 'name', 'characterId']
          })

          const data = response.map((character) => character.toJSON())
          res.status(200).json(data)
          break
        }
        case 'movies': {
          const response = await Character.findAll({
            include: [
              {
                model: Movie,
                as: 'movies',
                attributes: [],
                through: {
                  attributes: []
                },
                where: {
                  movieId: query.movies
                }
              }
            ],
            attributes: ['imageUrl', 'name', 'characterId']
          })

          const data = response.map((character) => character.toJSON())
          res.status(200).json(data)
          break
        }
        default: {
          const response = await Character.findAll({
            attributes: ['imageUrl', 'name', 'characterId']
          })

          const data = response.map((character) => character.toJSON())
          res.status(200).json(data)
          break
        }
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
    const { movies, imageUrl, name, age, weight, history } = body

    try {
      const myCharacter = await Character.findOne({
        where: {
          characterId: params.id
        }
      })

      if (myCharacter) {
        myCharacter.imageUrl = imageUrl
        myCharacter.name = name
        myCharacter.age = age
        myCharacter.weight = weight
        myCharacter.history = history
      }

      await myCharacter.setMovies([])

      const listOfMovies = await Movie.findAll()

      listOfMovies.forEach(async (movie) => {
        if (movies.includes(movie.dataValues.title))
          await myCharacter.addMovie(movie)
      })

      myCharacter.save()

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
