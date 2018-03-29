// Import Model
const Command = require('../models/command');
const error = require('../util/error');

exports.run = a => {
  // Check if a name is provided
  if (!a.args[0]) return a.message.channel.send(`Please name your command`);
  if (!a.args[1]) return a.message.channel.send(`Please provide a new name for the command`);

  // Find the command
  Command.find({name: a.args[0], guild: a.message.guild.id}).exec((err, command) => {
    if (!command[0]) return a.message.channel.send(`I did not find the command`);
    if (command[1]) return a.message.channel.send(error.message(1002));

    command[0].update({name: a.args[1]}, (err, result) => {
      if (err || !result.n > 0) return a.message.channel.send(`An error occured, couldn't update command name`);
      a.message.channel.send(`Successfully updated the name of command **${command[0].name}** to **${a.args[1]}**`);
    });
  });
}
