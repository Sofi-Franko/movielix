const {loginUser} = require("./service")

class SessionController {
  async login(req, res) {
    return loginUser(req, res)
  }
}

const sessionController = new SessionController()
module.exports = sessionController
