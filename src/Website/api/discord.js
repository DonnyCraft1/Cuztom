// Import Model
const User = require('../db/models/user');

const express = require(`express`);
const fetch = require('node-fetch');
const btoa = require('btoa');
const { catchAsync } = require('../utils.js');
const config = require(`../config`);
const mongoose = require('mongoose');

const CLIENT_ID = config.CLIENT_ID;
const CLIENT_SECRET = config.CLIENT_SECRET;
const redirect = encodeURIComponent('http://localhost:3000/api/discord/callback');
const router = express.Router();

// Map Global Promise - Get Rid Of Warning
mongoose.Promise = global.Promise;

// Connect To DataBase
const db = mongoose.connect(`mongodb://${config.db.user}:${config.db.pwd}@ds227939.mlab.com:27939/cuztom`);//('mongodb://localhost:27017/Cuztom');

router.get('/login', (req, res) => {
  res.redirect(`https://discordapp.com/oauth2/authorize?client_id=${CLIENT_ID}&scope=identify%20guilds&response_type=code&redirect_uri=${redirect}`);
});

router.get('/callback', catchAsync(async (req, res) => {
  if (!req.query.code) throw new Error('NoCodeProvided');
  const code = req.query.code;
  const creds = btoa(`${CLIENT_ID}:${CLIENT_SECRET}`);
  const response = await fetch(`https://discordapp.com/api/oauth2/token?grant_type=authorization_code&code=${code}&redirect_uri=${redirect}`, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${creds}`,
      },
    });
  const json = await response.json();
  const response2 = await fetch(`http://discordapp.com/api/users/@me/`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${json.access_token}`
    },
  });
  const json2 = await response2.json();
  res.redirect(`/me/?token=${json.access_token}`);
  console.log(json);
}));

module.exports = router;