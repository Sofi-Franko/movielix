const { hash, compare } = require('bcrypt');

const DEFAULT_SALT = 10;

class PasswordUtil {
  static async hash(pass) {
    return hash(pass, DEFAULT_SALT);
  }

  static async isPasswordMatch(dtoPass, storedPass) {
    return compare(dtoPass, storedPass);
  }
}

module.exports = PasswordUtil
