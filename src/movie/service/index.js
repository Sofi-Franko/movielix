const createMovie = require("./movie.create")
const deleteMovie = require("./movie.delete")
const updateMovie = require("./movie.update")
const getMovie = require("./movie.show")
const listMovies = require("./movie.list")
const importMovies = require("./movie.import")

module.exports = {
  create: createMovie,
  delete: deleteMovie,
  update: updateMovie,
  show: getMovie,
  list: listMovies,
  import: importMovies
}
