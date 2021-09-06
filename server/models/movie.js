// server/models/movie.js

const db = require('../db');

const Movie = {};

Movie.findAll = callback => {
  const sql = `
    SELECT *
    FROM Movie
  `;
  return db.all(sql, function (err, rows) {
    callback(err, rows);
  });
};

Movie.findById = (id, callback) => {
  const sql = `
    SELECT *
    FROM Movie
    WHERE id = ?
  `;
  return db.get(sql, id, function (err, result) {
    callback(err, result);
  });
};

Movie.create = ({ title, year }, callback) => {
  const sql = `
    INSERT INTO Movie (title, year)
    VALUES (?,?);
  `;
  return db.run(sql, [title, year], function (err, result) {
    callback(err, { ...result, newId: this.lastID });
  });
};

Movie.update = ({ id, title, year }, callback) => {
  const sql = `
    UPDATE Movie
    SET
      title = ?,
      year = ?
    WHERE id = ?;
  `;
  return db.run(sql, [title, year, id], function (err, result) {
    callback(err, result);
  });
};

Movie.delete = (id, callback) => {
  const sql = `
    DELETE FROM Movie
    WHERE id = ?;
  `;
  return db.run(sql, [id], function (err) {
    callback(err);
  });
};

module.exports = Movie;
