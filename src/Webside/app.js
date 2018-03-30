// Modules
const express = require(`express`);
const bodyParser = require(`body-parser`);
const mongoose = require(`mongoose`);
const path = require(`path`);

// Constants
const port = 3000;
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, `public`)));

// Routes
app.get(`/`, (req, res) => {
});

// Listen to port
app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});
