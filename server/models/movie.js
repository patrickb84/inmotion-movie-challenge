// server/models/movie.js

const db = require('../db');

const Movie = {};

Movie.findAll = callback => {
  const sql = `
    SELECT * FROM Movie
  `;
  return db.all(sql, function (err, rows) {
    callback(err, rows);
  });
};

Movie.add = ({ title, year }, callback) => {
  const sql = `
    INSERT INTO Movie (title, year)
    VALUES (?,?);
  `;
  return db.run(sql, [title, year], function (err, result) {
    callback(err, this.lastID);
  });
};

Movie.delete = (id, callback) => {
  const sql = `
    DELETE FROM Movie WHERE id = ?;
  `;
  return db.run(sql, [id], function (err) {
    callback(err);
  });
};

module.exports = Movie;
