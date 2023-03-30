const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Movie extends Model {
    static associate(models) {
      Movie.belongsToMany(models.Actor, { through: 'MovieActor', as: 'actors' });
    }
  }

  Movie.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
        unique: true
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      year: {
        type: DataTypes.NUMBER,
        allowNull: false,
      },
      format: {
        type: DataTypes.STRING,
        allowNull: false,
      }
    },
    {
      sequelize,
      modelName: 'Movie'
    }
  );

  return Movie;
};
