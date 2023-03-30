const {response} = require("express");
const {User} = require("../../db");
const PasswordUtil = require("../../utils/password.util");
const JwtUtil = require("../../utils/jwt.util");

module.exports = async (req, res = response) => {
  const { email, password } = req.body

  let user = await User.findOne({ where: { email } })
  if (!user) {
    return res.status(404).send({
      status: 0,
      error: {
        fields: {
          email: "AUTHENTICATION_FAILED"
        },
        code: "AUTHENTICATION_FAILED"
      }
    })
  }

  const decodedPass = await PasswordUtil.isPasswordMatch(password, user.password)
  if (!decodedPass) {
    return res.status(400).send({
      status: 0,
      error: {
        fields: {
          password: "AUTHENTICATION_FAILED"
        },
        code: "AUTHENTICATION_FAILED"
      }
    })
  }

  // create a token
  const token = JwtUtil.generateUserJWT(user);

  return res.status(200).send({ status: 1, token });

}
