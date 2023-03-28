const { sign, verify } = require('jsonwebtoken');

class JwtUtil {
  static generateUserJWT(user) {
    return sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_SECRET,
    );
  }

  static decodeJWT(token) {
    return verify(token, process.env.JWT_SECRET);
  }
}

module.exports = JwtUtil
