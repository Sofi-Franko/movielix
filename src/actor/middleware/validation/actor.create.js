const {check} = require("express-validator");

module.exports = [
  check('name', 'Name is either empty or invalid')
    .notEmpty().withMessage('Name is required')
    .isString().withMessage('Name must be string'),
]
