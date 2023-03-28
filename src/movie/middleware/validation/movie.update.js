const {check} = require("express-validator");

const ALLOWED_FORMATS = ["VHS", "DVD", "Blu-ray"]

module.exports = [
  check('title').optional().isString().withMessage('Title must be string'),
  check('year', 'Year is required')
    .optional()
    .isInt().withMessage('Year field must be a number')
    .isLength({min: 4, max: 4}).withMessage('Year must be 4 digits long'),
  check('format')
    .optional()
    .custom(((value) => ALLOWED_FORMATS.includes(value))).withMessage(`Format should be one of: ${ALLOWED_FORMATS.join(',')}`),
  check('actors')
    .optional()
    .custom(((value) => value.every(a => typeof a === "string"))).withMessage('List of actors should be a string'),
]
