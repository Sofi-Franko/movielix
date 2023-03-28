const {Router} = require('express');
const router = Router();

const {validateCreateUserBody} = require('./middleware/validation');
const validateInput = require('../middleware/validate.input');
const UserController = require("./user.controller")

// CREATE
router.post('', [...validateCreateUserBody, validateInput], UserController.create);

module.exports = router;
