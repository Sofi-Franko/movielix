const MovieService = require("./service")

class MovieController {
  async create(req, res) {
    let result
    try {
      result = await MovieService.create(req.body)
    } catch (e) {
      return res.status(400).send({status: 0, error: e});
    }

    return res.status(200).send({status: 1, data: result});
  }

  async delete(req, res) {
    return MovieService.delete(req, res)
  }

  async update(req, res) {
    return MovieService.update(req, res)
  }

  async show(req, res) {
    return MovieService.show(req, res)
  }

  async list(req, res) {
    return MovieService.list(req, res)
  }

  async import(req, res) {
    return MovieService.import(req, res)
  }
}

const movieController = new MovieController()
module.exports = movieController
