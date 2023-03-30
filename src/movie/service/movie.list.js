const {sequelize, Movie, Actor} = require("../../db");
const {QueryTypes, Op} = require("sequelize");

module.exports = async (req, res) => {
  const {actor, title, search, sort = 'id', order = 'ASC', limit = 20, offset = 0} = req.query;

  let list
  if (search) {
    list = await sequelize.query(getSelectByActorNameOrMovieTitleQuery(sort, order), {
      type: QueryTypes.SELECT,
      replacements: {
        search: `%${search}%`,
        limit,
        offset
      }
    });
  } else {
    let filter = {},
      actorFilter = {}
    if (actor) {
      actorFilter['name'] = {[Op.like]: `%${actor}%`}
    }
    if (title) {
      filter['title'] = {[Op.like]: `%${title}%`}
    }

    list = await Movie.findAll({
      include: [{
        model: Actor,
        as: 'actors',
        attributes: [],
        where: actorFilter
      }],
      where: filter,
      order: [[sequelize.literal(`LOWER('${sort}') COLLATE NOCASE`), order]],
      limit,
      offset,
    });
  }

  return res.status(200).send({status: 1, data: list, meta: {total: list.length}});
}

const getSelectByActorNameOrMovieTitleQuery = (sort, order) => `SELECT DISTINCT "Movies".*,
                    strftime('%Y-%m-%dT%H:%M:%fZ', "Movies"."createdAt") AS "createdAt",
                    strftime('%Y-%m-%dT%H:%M:%fZ', "Movies"."updatedAt") AS "updatedAt"
                FROM "Movies"
                LEFT JOIN "MovieActor" ON "Movies"."id" = "MovieActor"."movieId"
                LEFT JOIN "Actors" ON "MovieActor"."actorId" = "Actors"."id"
                WHERE "title" LIKE :search OR "name" LIKE :search
                ORDER BY LOWER('${sort}') COLLATE NOCASE ${order}
                LIMIT :limit OFFSET :offset;`
