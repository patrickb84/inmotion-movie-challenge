const Movie = require('../models/movie');

class MovieController {
  // get all
  async index(req, res) {
    Movie.findAll((err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ err });
      }
      return res.json({ movies: result });
    });
  }

  async add(req, res) {
    Movie.add(req.body, (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ err });
      }
      return res.json(result);
    });
  }
}

module.exports = new MovieController();
