const {check} = require("express-validator");

const ALLOWED_FORMATS = ["VHS", "DVD", "Blu-ray"],
  YEAR = {
  min: 1900,
  max: 2023
}

module.exports = [
  check('title').optional().isString().withMessage('Title must be string'),
  check('year', 'Year is required')
    .optional()
    .isInt({min: YEAR.min, max: YEAR.max}).withMessage(`Year can not be less then ${YEAR.min} and greater then ${YEAR.max}`),
  check('format')
    .optional()
    .custom(((value) => ALLOWED_FORMATS.includes(value))).withMessage(`Format should be one of: ${ALLOWED_FORMATS.join(',')}`),
  check('actors')
    .optional()
    .custom(((value) => value.every(a => typeof a === "string"))).withMessage('List of actors should be a string'),
]
