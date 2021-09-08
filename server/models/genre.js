// server/models/genre.js

const db = require('../db');

const Genre = {};

Genre.findAll = callback => {
  const sql = `SELECT * FROM Genre`;
  return db.all(sql, function (err, rows) {
    callback(err, rows);
  });
};

Genre.getAllMovieGenres = callback => {
  const sql = `SELECT g.*, movie_id FROM Movie_Genre mg INNER JOIN genre g ON mg.genre_id = g.id`;
  return db.all(sql, function (err, rows) {
    callback(err, rows);
  });
}

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

Genre.assignMovieGenres = (movieID, genres) => {
  var stmt = db.prepare(
    'INSERT INTO Movie_Genre (movie_id, genre_id) VALUES (?,?)'
  );
  [...genres].forEach(genre => stmt.run(movieID, genre.id));
  stmt.finalize();
};

Genre.getMovieGenres = (movieID, callback) => {
  const sql = `
    SELECT g.* FROM Movie_Genre mg
    INNER JOIN Genre g ON mg.genre_id = g.id
    WHERE movie_id = ?
  `;
  db.all(sql, [movieID], function (err, genres) {
    callback(err, genres);
  });
};

Genre.deleteMovieGenres = (movieID, callback) => {
  db.run(
    'DELETE FROM Movie_Genre WHERE movie_id = ?',
    [movieID],
    function (err) {
      if (err) callback(err);
    }
  );
};

module.exports = Genre;
