const create = require("./movie.create")
const update = require("./movie.update")
const list = require("./movie.list")

module.exports = {
  validateCreateMovieBody: create,
  validateUpdateMovieBody: update,
  validateListMovieQuery: list,
}
