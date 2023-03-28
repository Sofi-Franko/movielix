const {Actor} = require("../../models");

const getActorsToBeAddedToTheMovie = async (actors) => {
  let existedActors = await Actor.findAndCountAll({where: {name: actors}})
  let actorsToInsert = existedActors.rows

  if (actors.length !== existedActors.count) {
    const existedActorsNames = existedActors.rows.map(a => a.name)
    const missingActorsNames = [...existedActorsNames, ...actors]
      .filter((item, i, arr) => arr.indexOf(item) === arr.lastIndexOf(item));

    const actorsToCreate = missingActorsNames.map(a => {
      return {name: a}
    })

    let newActors = []
    try {
      newActors = await Actor.bulkCreate(actorsToCreate)
    } catch (e) {
      // skip error of uniqueness 'name' field
    }
    actorsToInsert = [...actorsToInsert, ...newActors]
  }

  return actorsToInsert
}

module.exports = {getActorsToBeAddedToTheMovie}
