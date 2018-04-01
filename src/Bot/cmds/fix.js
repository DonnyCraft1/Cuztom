// This Command Fixes All Duplicates And Removes All Refrences To Deleted Actions
// This Is Not Priority
// TODO: Create fix command

const Action = require('../models/action');
const Command = require('../models/command');
const error = require('../util/error');

let guild;

exports.run = a => {
  
  // Setup, Get Guild ID
  if (a.args[0]) {
    if(!a.message.author.id == a.config.dev) return a.message.channel.send(`Leave the args, you do not have permission to choose a guild!`);
    guild = a.args[0];
  } else {
    guild = a.message.guild.id;
  }
  a.message.channel.send(`Fixing guild **${a.client.guilds.get(guild) ? a.client.guilds.get(guild).name : guild}'s** problems!`);
  
  // TODO: Duplicate Actions
  // TODO: Duplicate Commands
  // TODO: Refrences To Deleted Action
}