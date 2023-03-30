const express = require("express");
const cors = require("cors");
const {sequelize} = require("./db")

sequelize.sync({ force: false }).then(() => console.log("db connected..."))

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.APP_PORT;
    this.host = process.env.HOST;
    this.paths = {
      usersApi: "/api/v1/users",
      sessionsApi: "/api/v1/sessions",
      moviesApi: "/api/v1/movies",
      actorsApi: "/api/v1/actors",
    };

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
  }

  routes() {
    this.app.use(this.paths.usersApi, require("./user/user.route"));
    this.app.use(this.paths.sessionsApi, require("./session/session.route"));
    this.app.use(this.paths.moviesApi, require("./movie/movie.route"));
    this.app.use(this.paths.actorsApi, require("./actor/actor.route"));
    this.app.get('/', (req, res) => {
      res.send('Works');
    });
  }

  listen() {
    this.app.listen(this.port,() => {
      console.log(`Server running on port ${this.port}`);
    });
  }
}

module.exports = Server;
