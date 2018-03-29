const mongoose = require('mongoose');

// Command Schema
const commandSchema = new mongoose.Schema ({

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

  // The Date Command Is Created
  date: {
    type: Date,
    required: true,
    default: Date.now
  },

  // Permissions, Array Of Role IDs
  permissions: [{
    type: String,
    required: true,
    default: []
  }],

  // The Action
  actions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'action',
    required: true,
    default: []
  }]
});

// Define And Export
module.exports = mongoose.model('command',commandSchema);
