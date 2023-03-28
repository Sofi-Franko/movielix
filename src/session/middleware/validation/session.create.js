const {check} = require("express-validator");

module.exports = [
  check('email')
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Value must be email'),
  check('password')
    .notEmpty().withMessage('Password is required'),
]
