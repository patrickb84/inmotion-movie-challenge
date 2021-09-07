// server.js

const express = require('express');
const path = require('path');
const PORT = 5000;
const app = express();
// const db = require('../db');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use('/api', require('./server/routes/router'));

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

// Serve any static files
app.use(express.static(path.join(__dirname, 'server/client/build')));

// File upload
const multer = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, 'client/public'));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});
const upload = multer({ storage: storage }).single('file');

app.post('/api/upload', (req, res) => {
  upload(req, res, err => {
    if (err) {
      res.sendStatus(500);
    }

    res.send(req.file);
  });
});

// Handle React routing, return all requests to React app
// app.get("*", function (req, res) {
//   res.sendFile(path.join(__dirname, "server/client/build", "index.html"));
// });
