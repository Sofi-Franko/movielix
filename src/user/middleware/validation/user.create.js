const {check} = require("express-validator");

module.exports = [
  check('email')
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Value must be email'),
  check('name')
    .notEmpty().withMessage('Name is required')
    .isString().withMessage('Name must be string'),
  check('password')
    .notEmpty().withMessage('Password is required'),
  check('confirmPassword')
    .notEmpty().withMessage('Password is required')
    .custom(((value, {req}) => value === req.body.password)).withMessage('Passwords are not equal')
]
