const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Actor extends Model {
    static associate(models) {
      Actor.belongsToMany(models.Movie, { through: 'MovieActor', as: 'movies' });
    }
  }

  Actor.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
        unique: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      }
    },
    {
      sequelize,
      modelName: 'Actor'
    }
  );

  return Actor;
};
