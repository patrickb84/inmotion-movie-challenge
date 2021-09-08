// server/models/movie.js

const db = require('../db');
const Genre = require('./genre');
const Actor = require('./actor');

const Movie = {};

// todo: add nested data, genres actors
Movie.findAll = callback => {
  const sql = `SELECT * FROM Movie`;
  return db.all(sql, (err, rows) => {
    callback(err, rows);
  });
};

Movie.findById = (id, callback) => {
  // step 1: select movie from movie table
  // step 2: get genres, append to movie
  // step 3: get actors, append to movie
  // step 4: return movie
  Movie.dbSelectMovie(id, function (err, movie) {
    if (err) callback(err);
    Genre.getMovieGenres(movie.id, function (err, genres) {
      if (err) callback(err);
      Actor.getMovieActors(movie.id, function (err, actors) {
        callback(err, { ...movie, genres, actors });
      });
    });
  });
};

Movie.dbSelectMovie = (id, callback) => {
  db.get(`SELECT * FROM Movie WHERE id = ?`, id, (err, result) => {
    callback(err, result);
  });
};

// todo: include genres actors etc
Movie.search = (query, callback) => {
  const sql = `
    SELECT id, title, year FROM Movie
    WHERE (LOWER(title || ' ') || CAST(year AS TEXT)) LIKE ?
  `;
  return db.all(sql, ['%' + query + '%'], function (err, rows) {
    callback(err, rows);
  });
};

Movie.create = (movie, callback) => {
  const { genres, actors } = movie;

  insertMovie(movie, (err, movieID) => {
    Genre.assignMovieGenres(movieID, genres);
    Actor.assignMovieActors(movieID, actors);
    Movie.findById(movieID, (err, result) => {
      callback(err, result);
    });
  });

  return movie;
};

const insertMovie = (movie, callback) => {
  const { title, year, poster, rating } = movie;
  const sqlInsert = `
    INSERT INTO Movie (title, year, poster, rating)
    VALUES (?,?,?,?);
  `;
  db.run(sqlInsert, [title, year, poster, rating], function (err) {
    callback(err, this.lastID);
  });
};

Movie.update = (
  { id, title, year, rating, genres, actors },
  callback
) => {
  db.serialize(() => {
    db.run(
      `UPDATE Movie 
      SET title = ?, year = ?, rating = ?
      WHERE id = ?`,
      [title, year, rating, id]
    );
    Genre.deleteMovieGenres(id, err => console.error(err));
    Genre.assignMovieGenres(id, [...genres]);
    Actor.deleteMovieActors(id, err => console.error(err));
    Actor.assignMovieActors(id, [...actors]);

    Movie.findById(id, (err, result) => callback(err, result));
  });
};

Movie.delete = (id, callback) => {
  db.run(`DELETE FROM Movie WHERE id = ?;`, [id], function (err) {
    if (err) callback(err);
    Genre.deleteMovieGenres(id, err => console.error(err));
    Actor.deleteMovieActors(id, err => console.log(err));
    callback(err, true);
  });
};

Movie.indexMovieGenres = callback => {
  const sql = `SELECT * FROM Movie_Genre`;
  return db.all(sql, function (err, rows) {
    callback(err, rows);
  });
};

Movie.findMoviesGenres = (id, callback) => {
  const sql = `SELECT g.* FROM Movie_Genre mg INNER JOIN Genre g ON g.id = mg.genre_id WHERE movie_id = ?`;

  return db.all(sql, [id], function (err, result) {
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
    callback(err, result);
  });
};

Movie.updatePoster = (id, poster, callback) => {
  const sql = `UPDATE Movie SET poster = ? WHERE id = ?`;
  db.run(sql, [poster, id], err => callback(err));
};

module.exports = Movie;
