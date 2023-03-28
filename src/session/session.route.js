const {Router} = require('express');
const router = Router();

const {validateLoginUserBody} = require('./middleware/validation');
const validateInput = require('../middleware/validate.input');
const SessionController = require("./session.controller")

// LOGIN
router.post('', [...validateLoginUserBody, validateInput], SessionController.login);

module.exports = router;
