// server/routes/index.js

const express = require('express');
const path = require('path');
const router = express.Router();

const movieController = require('../controllers/movie-controller');
const genreController = require('../controllers/genre-controller');
const actorController = require('../controllers/actor-controller');

router.get('/movies', movieController.index);
router.get('/movies/:id', movieController.detail);
router.post('/movies/search', movieController.search);
router.post('/movies', movieController.create);
router.put('/movies', movieController.update);
router.delete('/movies/:id', movieController.delete);

router.get('/genres', genreController.index);
router.get('/genres/:id', genreController.detail);
router.post('/genres', genreController.create);
router.put('/genres', genreController.update);
router.delete('/genres/:id', genreController.delete);

router.get('/actors', actorController.index);
router.get('/actors/:id', actorController.detail);
router.post('/actors', actorController.create);
router.put('/actors', actorController.update);
router.delete('/actors/:id', actorController.delete);

module.exports = router;
