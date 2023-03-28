const {Movie, Actor} = require("../../models");
const {getActorsToBeAddedToTheMovie} = require("../helpers/actors.to.movie");

module.exports = async (req, res) => {
  const {id} = req.params;
  const {title, year, format, actors} = req.body

  let movie = await Movie.findByPk(id)
  if (!movie) {
    return res.status(400).send({
      status: 0,
      error: {
        fields: {id},
        code: "MOVIE_NOT_FOUND"
      }
    })
  }

  let actorsToUpdate = null
  if (actors) {
    actorsToUpdate = await getActorsToBeAddedToTheMovie(actors)
  }

  try {
    await movie.update({title, year, format})
    if (actorsToUpdate) await movie.setActors(actorsToUpdate);
  } catch (e) {
    console.log('--- There was an error updating a MOVIE --- ', JSON.stringify(req.body))
    return res.status(400).send(e)
  }

  const movieWithActors = await Movie.findOne({
    where: {id},
    include: [{model: Actor, as: 'actors', through: {attributes: []}}]
  });

  return res.status(200).send({status: 1, data: movieWithActors});
}
