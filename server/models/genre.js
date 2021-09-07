// server/models/genre.js

const db = require('../db');

const Genre = {};

Genre.findAll = callback => {
  const sql = `SELECT * FROM Genre`;
  return db.all(sql, function (err, rows) {
    callback(err, rows);
  });
};



Genre.findById = (id, callback) => {
  const sql = `
    SELECT *
    FROM Genre
    WHERE id = ?
  `;
  return db.get(sql, id, function (err, result) {
    callback(err, result);
  });
};

Genre.create = ({ label }, callback) => {
  const sql = `
    INSERT INTO Genre (label)
    VALUES (?);
  `;
  return db.run(sql, [label], function (err, result) {
    callback(err, { ...result, newId: this.lastID });
  });
};

Genre.update = ({ id, label }, callback) => {
  const sql = `
    UPDATE Genre
    SET label = ?
    WHERE id = ?;
  `;
  return db.run(sql, [label, id], function (err, result) {
    callback(err, result);
  });
};

Genre.delete = (id, callback) => {
  const sql = `
    DELETE FROM Genre
    WHERE id = ?;
  `;
  return db.run(sql, [id], function (err) {
    callback(err);
  });
};

module.exports = Genre;
