// Import Model
const Command = require('../models/command');

exports.run = a => {

  if (!a.args[0]) return a.message.channel.send('Please name your command');

  Command.create({
    name: a.args[0],
    creator: a.message.author.id,
    guild: a.message.guild.id
  })
  .then(command => {
    a.message.channel.send('Created command ' + a.args[0]);
  })
}
