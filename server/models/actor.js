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

Actor.getAllMovieActors = callback => {
  const sql = `SELECT a.*, movie_id FROM Movie_Actor ma INNER JOIN Actor a ON ma.actor_id = a.id`;
  return db.all(sql, function (err, rows) {
    callback(err, rows);
  });
}

Actor.getMovieActors = (movieID, callback) => {
  const sql = `
    SELECT a.* FROM Movie_Actor ma
    INNER JOIN Actor a ON ma.actor_id = a.id
    WHERE movie_id = ?
  `;
  db.all(sql, [movieID], (err, rows) => {
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

Actor.assignMovieActors = (movieID, actors) => {
  var stmt = db.prepare(
    'INSERT INTO Movie_Actor (movie_id, actor_id) VALUES (?,?)'
  );
  [...actors].forEach(actor => stmt.run(movieID, actor.id));
  stmt.finalize();
};

Actor.deleteMovieActors = (movieID, callback) => {
  db.run(
    'DELETE FROM Movie_Actor WHERE movie_id = ?',
    [movieID],
    function (err) {
      if (err) callback(err);
    }
  );
};

module.exports = Actor;
