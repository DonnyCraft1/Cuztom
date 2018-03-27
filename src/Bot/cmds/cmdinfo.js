// Import Model
const Command = require('../models/command');
const error = require('../error');

exports.run = a => {
  // Check if a name is provided
  if (!a.args[0]) return a.message.channel.send('Please name your command');

  // Find the command
  Command.find({name: a.args[0], guild: a.message.guild.id}).exec((err, command) => {

    // If no command, return
    if (!command[0]) {
      return a.message.channel.send('I did not find that command, commands are case-sensitive!');
    }

    // If error, return
    if (err) return console.log(err);

    // If duplicate commands, return
    if (command[1]) {
      return a.message.channel.send(error.message('1001'));
    }

    // Send command info
    a.message.channel.send({embed: {
      color: 3447003,
      title: `__**${command[0].name}**__`,
      fields: [{
        name: 'Creator',
        value: a.message.guild.members.get(command[0].creator).displayName || command[0].creator
      },
      {
        name: 'Actions',
        value: '- ' + command[0].actions.join('\n- ')
      }],
      timestamp: command[0].date,
      footer: {
        icon_url: a.client.user.avatarURL,
        text: "Command created"
      }
    }});
  })
}
