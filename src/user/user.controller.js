const {response} = require("express");
const {createUser} = require("./service")

class UserController {
  async create(req, res = response) {
    return createUser(req, res)
  }
}

const userController = new UserController()
module.exports = userController
