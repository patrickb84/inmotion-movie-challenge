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

  async detail(req, res) {
    const { id } = req.params;
    Movie.findById(id, (err, result) => {
      if (err) {
        return res.status(500).json({ err });
      }
      if (result == undefined) {
        return res.sendStatus(404);
      }
      return res.json({ movie: result });
    });
  }

  async create(req, res) {
    const { title, year } = req.body;
    Movie.create({ title, year }, (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ err });
      }
      return res.json(result);
    });
  }

  async update(req, res) {
    const { id, title, year } = req.body;
    Movie.update({ id, title, year }, (err, result) => {
      if (err) {
        return res.status(500).json({ err });
      }
      return res.json({ success: true });
    });
  }

  async delete(req, res) {
    const { id } = req.params;
    Movie.delete(id, err => {
      if (err) {
        return res.status(500).json({ err });
      }
      return res.json({ success: true });
    });
  }
}

module.exports = new MovieController();
