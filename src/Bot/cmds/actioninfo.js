// Import Model
const Discord = require('discord.js');
const Action = require('../models/action');
const error = require('../util/error');
const actionTypes = require('../util/actiontype');

exports.run = a => {
  // Check if a name is provided
  if (!a.args[0]) return a.message.channel.send('Please name your action');

  // Find the action
  Action.find({name: a.args[0], guild: a.message.guild.id}).exec((err, action) => {
    // If error, return
    if (err) return a.message.channel.send(`And error occured`);

    // If no action, return
    if (!action[0]) {
      return a.message.channel.send(`I did not find that action, commands are case-sensitive!`);
    }

    // If duplicate commands, return
    if (action[1]) {
      return a.message.channel.send(error.message('1002'));
    }

    const embed = new Discord.RichEmbed()
      .setColor(3447003)
      .setTitle(`Action __**${action[0].name}**__`)
      .addField(`type`, `${actionTypes.types[action[0].actionType]}`)
      .addField(`value`, `${action[0].value}`);

    a.message.channel.send(embed);
  })

}
