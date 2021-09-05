class MovieController {
  async index(req, res) {
    res.send('MovieController.index');
  }
}

module.exports = new MovieController();