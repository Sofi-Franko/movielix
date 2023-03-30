const {Movie} = require("../../db");

module.exports = async (req, res) => {
  const {id} = req.params;

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

  try {
    await movie.destroy();
  } catch (e) {
    console.log('--- There was an error deleting a MOVIE --- ', JSON.stringify(req.body))
    return res.status(400).send(e)
  }

  return res.status(200).send({status: 1});
}
