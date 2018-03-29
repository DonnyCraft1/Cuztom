// Import Model
const Command = require('../models/command');
const Action = require('../models/action');
const error = require('../util/error');

exports.run = a => {
  // Check if a name is provided
  if (!a.args[0]) return a.message.channel.send('Please name your command');

  // Find the command
  Command.find({name: a.args[0], guild: a.message.guild.id}).populate('actions').exec((err, command) => {

    // If error, return
    if (err) return a.message.channel.send(`And error occured`);

    // If no command, return
    if (!command[0]) {
      return a.message.channel.send('I did not find that command, commands are case-sensitive!');
    }

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
        value: '- ' + command[0].actions.map(action => {
          return action.name;
        }).join('\n- ')
      },
      {
        name: 'Permission',
        value: '- ' + command[0].permissions.map(perm => {
          // Trying To Find Permission Name
          let roleName = a.message.guild.roles.get(perm);
          if (roleName) roleName = roleName.name;
          else roleName = perm + ' - Warning, this role does not exist!';
          return roleName;
        }).join('\n- ')
      }],
      timestamp: command[0].date,
      footer: {
        icon_url: a.client.user.avatarURL,
        text: "Command created"
      }
    }});
  })
}
