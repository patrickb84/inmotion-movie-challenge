// server/models/movie.js

const db = require('../db');

const Movie = {};

Movie.findAll = callback => {
  const sql = `SELECT * FROM Movie`;
  return db.all(sql, function (err, rows) {
    callback(err, rows);
  });
};

module.exports = Movie;
