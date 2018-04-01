const Discord = require('discord.js');
const Action = require('../models/action');
const error = require('../util/error');
const actionTypes = require('../util/actiontype');

exports.run = a => {

  // Find the actions
  Action.find({guild: a.message.guild.id}).exec((err, actions) => {

    // If error, return
    if (err) return a.message.channel.send(`And error occured`);

    // If no action, return
    if (!actions[0]) {
      return a.message.channel.send(`You haven't created any actions yet`);
    }

    // Send action info
    const embed = new Discord.RichEmbed()
      .setColor(3447003)
      .setTitle(`__**${a.message.guild.name}'s Custom Actions**__`);
    actions.forEach(act => {
      embed.addField(`${act.name}`, `type: ${actionTypes.types[act.actionType]}\nvalue: ${act.value}`);
    });
    a.message.channel.send({embed});
  })
}
