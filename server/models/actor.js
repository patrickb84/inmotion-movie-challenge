// server/models/actor.js

const db = require('../db');

const Actor = {};

Actor.findAll = callback => {
  const sql = `
    SELECT *
    FROM Actor
  `;
  return db.all(sql, function (err, rows) {
    callback(err, rows);
  });
};

Actor.findById = (id, callback) => {
  const sql = `
    SELECT *
    FROM Actor
    WHERE id = ?
  `;
  return db.get(sql, id, function (err, result) {
    callback(err, result);
  });
};

Actor.create = ({ name }, callback) => {
  const sql = `
    INSERT INTO Actor (name)
    VALUES (?);
  `;
  return db.run(sql, [name], function (err, result) {
    callback(err, { ...result, newId: this.lastID });
  });
};

Actor.update = ({ id, name }, callback) => {
  const sql = `
    UPDATE Actor
    SET
    name = ?
    WHERE id = ?;
  `;
  return db.run(sql, [name, id], function (err, result) {
    callback(err, result);
  });
};

Actor.delete = (id, callback) => {
  const sql = `
    DELETE FROM Actor
    WHERE id = ?;
  `;
  return db.run(sql, [id], function (err) {
    callback(err);
  });
};

module.exports = Actor;
