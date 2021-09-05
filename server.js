// server.js

const express = require('express');
const PORT = 5000;
const app = express();
// const db =

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.get('/', (req, res) => {
  res.send('Hello from express');
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
