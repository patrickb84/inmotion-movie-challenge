// server/models/movie.js

const db = require('../db');

const Movie = {};

Movie.findAll = callback => {
  const sql = `SELECT * FROM Movie`;
  return db.all(sql, (err, rows) => {
    callback(err, rows);
  });
};

Movie.findById = (id, callback) => {
  const sql = `SELECT * FROM Movie WHERE id = ?`;
  db.get(sql, id, function (err, movie) {
    if (err) callback(err);
    db.all(
      `SELECT g.* FROM Movie_Genre mg 
      INNER JOIN Genre g
      ON mg.genre_id = g.id
      WHERE movie_id = ?`,
      [id],
      (err, genres) => {
        // callback(err, { ...movie, genres: rows });
        console.log(err);
        if (err) callback(err);
        db.all(
          `SELECT a.* FROM Movie_Actor ma 
          INNER JOIN Actor a
          ON ma.actor_id = a.id
          WHERE movie_id = ?`,
          [id],
          (err, actors) => {
            console.log(err);
            callback(err, { ...movie, genres, actors });
          }
        );
      }
    );
  });
};

Movie.search = (query, callback) => {
  console.log('model.search', query);
  const sql = `
    SELECT id, title, year FROM Movie
    WHERE (LOWER(title || ' ') || CAST(year AS TEXT)) LIKE ?
  `;
  return db.all(sql, ['%' + query + '%'], function (err, rows) {
    callback(err, rows);
  });
};

Movie.create = ({ title, year, genres, actors }, callback) => {
  const sql = `
    INSERT INTO Movie (itle, year, genres, actors)
    VALUES (?,?,?,?);
  `;
  return db.run(sql, [title, year, genres, actors], function (err, result) {
    callback(err, { ...result, newId: this.lastID });
  });
};

/**
 * Update movie
 */
Movie.update = ({ id, title, year, genres, actors }, callback) => {
  db.serialize(() => {
    db.run(`UPDATE Movie SET title = ?, year = ? WHERE id = ?`, [
      title,
      year,
      id,
    ]);

    db.run('DELETE FROM Movie_Genre WHERE movie_id = ?', [id]);
    var stmtGenres = db.prepare(
      'INSERT INTO Movie_Genre (movie_id, genre_id) VALUES (?,?)'
    );
    genres.forEach(genre => {
      stmtGenres.run(id, genre.id);
    });
    stmtGenres.finalize();

    db.run('DELETE FROM Movie_Actor WHERE movie_id = ?', [id]);
    var stmtActors = db.prepare(
      'INSERT INTO Movie_Actor (movie_id, actor_id) VALUES (?,?)'
    );
    actors.forEach(actor => stmtActors.run([id, actor.id]));
    stmtActors.finalize();
  });

  Movie.findById(id, (err, result) => callback(err, result));
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

Movie.indexMovieGenres = callback => {
  const sql = `SELECT * FROM Movie_Genre`;
  return db.all(sql, function (err, rows) {
    callback(err, rows);
  });
};

Movie.findMoviesGenres = (id, callback) => {
  console.log('ID IS', id);

  const sql = `SELECT g.* FROM Movie_Genre mg INNER JOIN Genre g ON g.id = mg.genre_id WHERE movie_id = ?`;

  return db.all(sql, [id], function (err, result) {
    console.log(err, result);
    callback(err, result);
  });
};

Movie.indexMovieActors = callback => {
  const sql = `SELECT * FROM Movie_Actor`;
  return db.all(sql, function (err, rows) {
    callback(err, rows);
  });
};

Movie.findMoviesActors = (id, callback) => {
  const sql = `SELECT a.* FROM Movie_Actor ma INNER JOIN Actor a ON a.id = ma.actor_id WHERE movie_id = ?`;

  return db.all(sql, [id], function (err, result) {
    console.log(err, result);
    callback(err, result);
  });
};

module.exports = Movie;
