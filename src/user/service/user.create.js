const {response} = require("express");
const {User} = require("../../models");
const PasswordUtil = require("../../utils/password.util");
const JwtUtil = require("../../utils/jwt.util");

module.exports = async (req, res = response) => {
  const { email, name, password } = req.body

  let user = await User.findOne({ where: { email } })
  if (user) {
    return res.status(400).send({
      status: 0,
      error: {
        fields: {
          email: "NOT_UNIQUE"
        },
        code: "EMAIL_NOT_UNIQUE"
      }
    })
  }

  const hashedPass = await PasswordUtil.hash(password)
  try {
    user = await User.create({ email, name, password: hashedPass })
  } catch (e) {
    console.log('--- There was an error creating a user --- ', JSON.stringify(req.body))
    return res.status(400).send(e)
  }

  // create a token
  const token = JwtUtil.generateUserJWT(user);

  return res.status(200).send({ status: 1, token });
}
