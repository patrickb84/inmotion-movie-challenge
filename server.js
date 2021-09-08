// server.js

const express = require('express');
const path = require('path');
const PORT = 5000;
const app = express();
const db = require('./server/db');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use('/api', require('./server/routes/router'));

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

// Serve any static files
app.use(express.static(path.join(__dirname, 'server/client/public')));

// File upload
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, 'client/public/images/');
  },
  filename: (req, file, callback) => {
    const Movie = require('./server/models/movie');
    const { id } = req.params;
    Movie.dbSelectMovie(id, (err, result) => {
      if (err) callback(err);
      const titleStr = result.title.split(' ').join('').replace(/\W/g, '');
      const imgStr = file.originalname.split(' ').join('');
      const filename = `${titleStr}__${imgStr}`;

      Movie.updatePoster(id, filename, err => {
        if (err) callback(err);
      });
      
      callback(err, filename);
    });
  },
});

const multerUpload = multer({ storage: storage }).single('file');

app.post('/api/upload/:id', (req, res) => {
  const { id } = req.params;
  multerUpload(req, res, err => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    }
    res.send(req.file);
  });
});
