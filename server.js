// server.js

const express = require('express');
const PORT = 5000;
const app = express();
// const db =

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use('/api/movies', require('./server/router/movie-router'));

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
