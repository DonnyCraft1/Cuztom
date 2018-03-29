// Import Model
const Command = require('../models/command');
const Action = require('../models/action');
const error = require('../util/error');
const Discord = require('discord.js');

exports.run = a => {

  // Find the commands
  Command.find({guild: a.message.guild.id}).populate('actions').exec((err, commands) => {

    // If error, return
    if (err) return a.message.channel.send(`And error occured. Try to run **${a.config.prefix}fix**`);

    // If no command, return
    if (!commands[0]) {
      return a.message.channel.send(`You haven't created any commands yet`);
    }

    // Send command info
    const embed = new Discord.RichEmbed()
      .setTitle(`__**${a.message.guild.name}'s Custom Commands**__`);
    commands.forEach(cmd => {
      embed.addField(cmd.name, '- ' + cmd.actions.map(action => {
        return action.name;
      }).join('\n- '));
    })
    a.message.channel.send({embed});
  })
}
