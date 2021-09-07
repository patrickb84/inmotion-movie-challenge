const Movie = require('../models/movie');

class MovieController {
  async index(req, res) {
    Movie.findAll((err, result) => {
      if (err) {
        return res.status(500).json({ err });
      }
      return res.json(result);
    });
  }

  async search(req, res) {
    const { query } = req.body;
    Movie.search(query, (err, result) => {
      if (err) {
        return res.status(500).json({ err });
      }
      return res.json(result);
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
      return res.json(result);
    });
  }

  async create(req, res) {
    const { title, year, genres, actors } = req.body;
    Movie.create({ title, year, genres, actors }, (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ err });
      }
      return res.json(result);
    });
  }

  async update(req, res) {
    const { id, title, year, genres, actors } = req.body;
    console.log(req.body);
    Movie.update({ id, title, year, genres, actors }, (err, result) => {
      if (err) {
        return res.status(500).json({ err });
      }
      return res.json(result);
    });
  }

  async delete(req, res) {
    const { id } = req.params;
    Movie.delete(id, err => {
      if (err) {
        res.status(500).json({ err });
      }
      res.json({ success: true });
    });
  }
}

module.exports = new MovieController();
