// server/routes/index.js

const express = require('express');
const movieRouter = express.Router();

const movieController = require('../controllers/movie-controller');

movieRouter.get('/', movieController.index);
movieRouter.get('/:id', movieController.detail);
movieRouter.post('/', movieController.create);
movieRouter.put('/', movieController.update);
movieRouter.delete('/:id', movieController.delete);

module.exports = movieRouter;
