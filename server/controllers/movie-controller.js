const movie = require('../models/movie');

class MovieController {
  async index(req, res) {
    res.send(movie.findAll());
  }
}

module.exports = new MovieController();
