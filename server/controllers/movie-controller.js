const Movie = require('../models/movie');

class MovieController {
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
    const { title, year } = req.body;
    Movie.add({ title, year }, (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ err });
      }
      return res.json(result);
    });
  }

  async delete(req, res) {
    const { id } = req.params;

    Movie.delete(id, err => {
      if (err) {
        console.error(err);
        return res.status(500).json({ err });
      }
      return res.json({ success: true });
    });
  }
}

module.exports = new MovieController();
