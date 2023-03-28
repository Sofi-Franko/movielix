const { Router } = require('express');
const router = Router();

const {validateCreateActorBody} = require('./middleware/validation');
const validateInput = require('../middleware/validate.input');
const verifyToken = require("../middleware/verify.token");
const ActorController = require("./actor.controller")

// CREATE
router.post('',[...validateCreateActorBody, validateInput, verifyToken], ActorController.create);

module.exports = router;
