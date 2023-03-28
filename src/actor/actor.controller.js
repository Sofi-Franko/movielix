const {actorCreate} = require("./service")

class ActorController {
  async create(req, res) {
    return actorCreate(req, res)
  }
}

const actorController = new ActorController()
module.exports = actorController
