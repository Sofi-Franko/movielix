const {Router} = require('express');
const router = Router();

const {validateCreateMovieBody, validateUpdateMovieBody, validateListMovieQuery} = require('./middleware/validation');
const validateInput = require('../middleware/validate.input');
const verifyToken = require("../middleware/verify.token");
const MovieController = require("./movie.controller")

// CREATE
router.post('', [...validateCreateMovieBody, validateInput, verifyToken], MovieController.create);

// DELETE
router.delete('/:id', verifyToken, MovieController.delete)

// UPDATE
router.patch('/:id', [...validateUpdateMovieBody, validateInput, verifyToken], MovieController.update);

// SHOW
router.get('/:id', verifyToken, MovieController.show)

// LIST
router.get('', [...validateListMovieQuery, verifyToken], MovieController.list)

// IMPORT
router.post('/import', verifyToken, MovieController.import)

module.exports = router;
