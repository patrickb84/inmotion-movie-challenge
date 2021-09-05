// server/routes/index.js

const express = require('express');
const router = express.Router();

const movieController = require('../controllers/movie-controller');

router.get('/movies', movieController.index);
router.post('/movies', movieController.add);

module.exports = router;
