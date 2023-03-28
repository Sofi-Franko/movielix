const {response} = require("express");
const {Actor} = require("../../models");

module.exports = async (req, res = response) => {
  const { name } = req.body

  let actor
  try {
    actor = await Actor.create({ name })
  } catch (e) {
    return res.status(500).send(e)
  }

  return res.status(200).send({ status: 1, actor });
}
