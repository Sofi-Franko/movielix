const {Actor, Movie} = require("../../models");
const {getActorsToBeAddedToTheMovie} = require("../helpers/actors.to.movie")

module.exports = async (dto, includeRelatedActors = true) => {
  const {title, year, format, actors} = dto

  let movie = await Movie.findOne({where: {title}})
  if (movie) {
    throw {fields: {title: "NOT_UNIQUE"}, code: "MOVIE_EXISTS", params: { title }}
  }

  let actorsToInsert = await getActorsToBeAddedToTheMovie(actors)

  try {
    movie = await Movie.create({title, year, format})
    await movie.setActors(actorsToInsert);
  } catch (e) {
    console.log('--- There was an error creating a MOVIE --- ', JSON.stringify(dto))
    throw e
  }

  const q = { where: {id: movie.id} }
  if (includeRelatedActors) q.include = [{model: Actor, as: 'actors', through: {attributes: []}}]

  return Movie.findOne(q);
}
