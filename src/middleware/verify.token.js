const JwtUtil = require("../utils/jwt.util")
const {User} = require("../db");

const verifyToken = async (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) return res.status(403).send({
      status: 0,
      error: {
        fields: { token: "REQUIRED" },
        code: "FORMAT_ERROR"
      }
    });

  const decoded = JwtUtil.decodeJWT(token);

  let user = await User.findOne({ where: { id: decoded.id } })
  if (!user) {
    return res.status(403).send({
      status: 0,
      error: {
        fields: { token: "INVALID" },
        code: "FORMAT_ERROR"
      }
    });
  }

  next();
}

module.exports = verifyToken
