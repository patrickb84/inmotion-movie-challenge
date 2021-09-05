// server/models/movie.js

const db = require('../db');

const Movie = {};

Movie.findAll = callback => {
  const sql = `SELECT * FROM Movie`;
  return db.all(sql, function (err, rows) {
    callback(err, rows);
  });
};

Movie.add = (params, callback) => {
  console.log('Movie.add()');

  const { title, year } = params;
  const sql = `
    INSERT INTO Movie (title, year)
    VALUES (?,?);
  `;

  return db.run(sql, [title, year], function (err, result) {
    console.log('last_insert_rowid: ', this.lastID);
    callback(err, this.lastID);
  });
};

module.exports = Movie;
