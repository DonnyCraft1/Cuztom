// Import Model
const Command = require('../models/command');
const error = require('../util/error');

exports.run = a => {

  if (!a.args[0]) return a.message.channel.send('Please name your command');

  Command.find({name: a.args[0], guild: a.message.guild.id}).exec((err, command) => {

    // Check If Already Duplicate
    if (command[1]) {
      return a.message.channel.send(error.message('1001'));
    }

    // Check If Command Exist
    if (command[0]) {
      return a.message.channel.send(`There is already a command with the name **${command[0].name}**`);
    }

    Command.create({
      name: a.args[0],
      creator: a.message.author.id,
      guild: a.message.guild.id
    })
    .then(command => {
      a.message.channel.send('Successfully created the command ' + a.args[0]);
    });
  });
}
