import { Character } from './CharacterModel.js'
import { User } from './UserModel.js'
import { Genre } from './GenreModel.js'
import { Movie } from './MovieModel.js'

Character.belongsToMany(Movie, {
  through: 'CharacterMovie',
  as: 'movies',
  foreignKey: 'character_id'
})
Movie.belongsToMany(Character, {
  through: 'CharacterMovie',
  as: 'characters',
  foreignKey: 'movie_id'
})

Genre.belongsToMany(Movie, {
  through: 'GenreMovie',
  as: 'movies',
  foreignKey: 'genre_id'
})
Movie.belongsToMany(Genre, {
  through: 'GenreMovie',
  as: 'genres',
  foreignKey: 'movie_id'
})

export { Character, User, Genre, Movie }
