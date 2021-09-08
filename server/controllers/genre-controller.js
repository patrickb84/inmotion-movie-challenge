const Genre = require('../models/genre');

class GenreController {
  async index(req, res) {
    Genre.findAll((err, result) => {
      if (err) {
        return res.status(500).json({ err });
      }
      return res.json({ genres: result });
    });
  }

  async getAllMovieGenres(req, res) {
    Genre.getAllMovieGenres((err, result) => {
      if (err) {
        return res.status(500).json({ err });
      }
      return res.json(result);
    });
  }

  async detail(req, res) {
    const { id } = req.params;
    Genre.findById(id, (err, result) => {
      if (err) {
        return res.status(500).json({ err });
      }
      if (result == undefined) {
        return res.sendStatus(404);
      }
      return res.json({ genre: result });
    });
  }

  async create(req, res) {
    const { label } = req.body;
    Genre.create({ label }, (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ err });
      }
      return res.json(result);
    });
  }

  async update(req, res) {
    const { id, label } = req.body;
    Genre.update({ id, label }, (err, result) => {
      if (err) {
        return res.status(500).json({ err });
      }
      return res.json({ success: true });
    });
  }

  async delete(req, res) {
    const { id } = req.params;
    Genre.delete(id, err => {
      if (err) {
        return res.status(500).json({ err });
      }
      return res.json({ success: true });
    });
  }
}

module.exports = new GenreController();
