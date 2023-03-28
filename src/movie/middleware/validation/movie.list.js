const {query} = require("express-validator");

const SORT_FIELDS = ['id', 'title', 'year'],
  ORDER_FIELDS = ["ASC", "DESC"],
  LIMIT_MAX = 100

module.exports = [
  query('sort')
    .optional().isIn(SORT_FIELDS).withMessage(`Invalid sort field. Must be one of: ${SORT_FIELDS.join(', ')}`),
  query('order')
    .optional().isIn(ORDER_FIELDS).withMessage(`Invalid order field. Must be one of: ${ORDER_FIELDS.join(', ')}`),
  query('limit')
    .optional().isInt({
    min: 1,
    max: LIMIT_MAX
  }).withMessage(`Invalid limit field. Must be an integer between 1 and ${LIMIT_MAX}`),
  query('offset')
    .optional().isInt({min: 0}).withMessage('Invalid offset field. Must be a non-negative integer'),
]
