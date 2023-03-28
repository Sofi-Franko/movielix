const {check} = require("express-validator");

const ALLOWED_FORMATS = ["VHS", "DVD", "Blu-ray"]

module.exports = [
  check('title')
    .notEmpty().withMessage('Title is required')
    .isString().withMessage('Title must be string'),
  check('year')
    .notEmpty().withMessage('Year is required')
    .isInt().withMessage('Year field must be a number')
    .isLength({min: 4, max: 4}).withMessage('Year must be 4 digits long'),
  check('format')
    .notEmpty().withMessage('Format is required')
    .custom(((value) => ALLOWED_FORMATS.includes(value))).withMessage(`Format should be one of: ${ALLOWED_FORMATS.join(', ')}`),
  check('actors')
    .notEmpty().withMessage('List of actors is required')
    .custom(((value) => value.every(a => typeof a === "string"))).withMessage('List of actors should be a string'),
]
