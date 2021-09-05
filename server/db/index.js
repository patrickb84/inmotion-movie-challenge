// server/db/index.js

const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./server/database.sqlite', err => {
  if (err) return console.error(err.message);
  console.log('Connected to the SQlite database.');
});

module.exports = db;
