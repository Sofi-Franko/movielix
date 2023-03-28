const {Movie, Actor} = require("../../models");

module.exports = async (req, res) => {
  const {id} = req.params;

  let movie = await Movie.findOne({
    where: {id},
    include: [{model: Actor, as: 'actors', through: {attributes: []}}]
  });

  if (!movie) {
    return res.status(400).send({
      status: 0,
      error: {
        fields: {id},
        code: "MOVIE_NOT_FOUND"
      }
    })
  }

  return res.status(200).send({status: 1, data: movie});
}
