// server/uploader.js

const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, 'client/public/images/');
  },
  filename: (req, file, callback) => {
    callback(null, file.originalname);
  },
});

const fileUpload = multer({ storage }).single('file');

// app.post('/api/upload/:id', (req, res) => {
//   const { id } = req.params;
//   fileUpload(req, res, err => {
//     if (err) {
//       console.error(err);
//       res.sendStatus(500);
//     }
//     res.send(req.file);
//   });
// });

module.exports = fileUpload;