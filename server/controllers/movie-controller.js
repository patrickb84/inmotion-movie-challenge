const movie = require('../models/movie');

class MovieController {
  // get all
  async index(req, res) {
    movie.findAll((err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ err });
      }
      return res.json(result);
    });
  }

  async add(req, res) {
    const { movie } = req.body;
    movie.add(movie, (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ err });
      }
      return res.json(result);
    })
  }
}

module.exports = new MovieController();
