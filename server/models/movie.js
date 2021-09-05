// server/models/movie.js

const db = require('../db');

const Movie = {};

Movie.findAll = callback => {
  const sql = `SELECT * FROM Movie`;
  return db.all(sql, function (err, rows) {
    callback(err, rows);
  });
};

Movie.add = (movie, callback) => {
  const { title, year } = movie;
  const sql = `
    INSERT INTO Movie (title, year)
    VALUES (?,?);
    SELECT last_insert_rowid();
  `;

  return db.run(sql, [title, year], function (err, result) {
    console.log('last_insert_rowid: ', result);
    callback(err, result);
  });
};

module.exports = Movie;
