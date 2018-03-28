const mongoose = require('mongoose');

// Command Schema
const actionSchema = new mongoose.Schema ({

  // The Command Name
  name: {
    type: String,
    required: true
  },

  // The ID Of The User Creating The Command. String Because Dicord.js Uses String
  creator: {
    type: String,
    required: true
  },

  // The Guild ID The Command Was Created In
  guild: {
    type: String,
    required: true
  },

  // What Type The Action Is. Not Called Type Because It Is A Keyword
  actionType: {
    type: String,
    required: true,
    default: '0' // See actiontype.js
  },

  // The Vaule Of The Action
  value: {
    type: String,
    required: true,
    default: 'Change the value to change this message'
  },

  // The Date Command Is Created
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
});

// Define And Export
module.exports = mongoose.model('action', actionSchema);
