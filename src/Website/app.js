// Modules
const express = require(`express`);
const favicon = require('serve-favicon')
const path = require(`path`);
const bodyParser = require(`body-parser`);
const mongoose = require(`mongoose`);

// Constants
const port = 3000;
const app = express();

// Middleware - View Engine
app.set(`view engine`, 'ejs');
app.set(`views`, path.join(__dirname, `views`));

// Middleware - BodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Middleware - Set Static Path
app.use(express.static(path.join(__dirname, `public`)));

// Middelware - Set Favicon
app.use(favicon(path.join(__dirname, 'public', 'favicon.png')));

// Middleware - Discord.js
app.use('/api/discord', require('./api/discord'));

// Routes
app.get(`/`, (req, res) => {
  res.render(`index`);
});

// Listen to port
app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});
