// Require Dependencies
const Discord = require('discord.js');
const config = require('./config.json');
const mongoose = require('mongoose');

// Create The Client
const client = new Discord.Client();

// Require The EventLoader
require('./util/eventLoader')(client);

// Map Global Promise - Get Rid Of Warning
mongoose.Promise = global.Promise;

// Connect To DataBase
const db = mongoose.connect(`mongodb://${config.db.user}:${config.db.pwd}@ds227939.mlab.com:27939/cuztom`);//('mongodb://localhost:27017/Cuztom');

// LogIn The Bot
client.login(config.token);
