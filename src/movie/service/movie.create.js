const {Actor, Movie} = require("../../db");
const {getActorsToBeAddedToTheMovie} = require("../helpers/actors.to.movie")

const YEAR = {
  min: 1900,
  max: 2023
}

module.exports = async (dto, includeRelatedActors = true) => {
  const {title, year, format, actors} = dto

  let movie = await Movie.findOne({where: {title}})
  if (movie) {
    throw {fields: {title: "NOT_UNIQUE"}, code: "MOVIE_EXISTS", params: { title }}
  }

  const trimmedTitle = title.trim()
  if (trimmedTitle === '') {
    throw {
      fields: {title: "INVALID"},
      code: "TITLE_IS_WHITESPACES",
      message: "Title must be some name",
      params: {title}
    }
  }
  if (year < YEAR.min || year > YEAR.max) {
    throw {
      fields: {year: "INVALID"},
      code: "YEAR_NOT_VALID",
      message: `Year can not be less then ${YEAR.min} and greater then ${YEAR.max}`,
      params: {year}
    }
  }

  let actorsToInsert = await getActorsToBeAddedToTheMovie(actors)

  try {
    movie = await Movie.create({title: trimmedTitle, year, format})
    await movie.setActors(actorsToInsert);
  } catch (e) {
    console.log('--- There was an error creating a MOVIE --- ', JSON.stringify(dto))
    throw e
  }

  const q = { where: {id: movie.id} }
  if (includeRelatedActors) q.include = [{model: Actor, as: 'actors', through: {attributes: []}}]

  return Movie.findOne(q);
}
