const Actor = require('../models/actor');

class ActorController {
  async index(req, res) {
    Actor.findAll((err, result) => {
      if (err) {
        return res.status(500).json({ err });
      }
      return res.json({ actors: result });
    });
  }

  async detail(req, res) {
    const { id } = req.params;
    Actor.findById(id, (err, result) => {
      if (err) {
        return res.status(500).json({ err });
      }
      if (result == undefined) {
        return res.sendStatus(404);
      }
      return res.json({ actor: result });
    });
  }

  async create(req, res) {
    const { name } = req.body;
    Actor.create({ name }, (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ err });
      }
      return res.json(result);
    });
  }

  async update(req, res) {
    const { id, name } = req.body;
    Actor.update({ id, name }, (err, result) => {
      if (err) {
        return res.status(500).json({ err });
      }
      return res.json({ success: true });
    });
  }

  async delete(req, res) {
    const { id } = req.params;
    Actor.delete(id, err => {
      if (err) {
        return res.status(500).json({ err });
      }
      return res.json({ success: true });
    });
  }
}

module.exports = new ActorController();
