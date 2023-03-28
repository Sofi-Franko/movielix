const { Sequelize, DataTypes } = require('sequelize');
const UserModel = require('./user.model');
const MovieModel = require('./movie.model');
const ActorModel = require('./actor.model');

const sequelize = new Sequelize('movielixdb', 'admin', '123', {
  dialect: "sqlite",
  host: "./dev.sqlite",
  pool: {
    max: 5,
    min: 0,
    acquire: 300000,
    idle: 100000,
  }
})

const User = UserModel(sequelize, DataTypes);
const Movie = MovieModel(sequelize, DataTypes);
const Actor = ActorModel(sequelize, DataTypes);

Movie.associate({ Actor });
Actor.associate({ Movie });

module.exports = { sequelize, User, Movie, Actor };
