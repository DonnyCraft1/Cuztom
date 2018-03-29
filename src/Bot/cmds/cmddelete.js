// Import Model
const Command = require('../models/command');
const error = require('../util/error');

exports.run = a => {

  if (!a.args[0]) return a.message.channel.send('Please name your command');

  Command.deleteMany({name: a.args[0], guild: a.message.guild.id}, (err, result) => {
    if (err || !result.n > 0) return a.message.channel.send(`I couldn't delete this command. It might not exist`);
    a.message.channel.send(`Successfully deleted command **${a.args[0]}**`);
  });
}
