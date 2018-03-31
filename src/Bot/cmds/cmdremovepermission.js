// Import Model
const Command = require('../models/command');
const error = require('../util/error');

exports.run = a => {

  // Check If All Arguments Are Not Undefined
  if (!a.args[0]) return a.message.channel.send('Please name your command');
  if (!a.args[1]) return a.message.channel.send('Please name your permission role');

  Command.find({name: a.args[0], guild: a.message.guild.id}).exec((err, cmd) => {

    // The Command Was Not Found
    if (!cmd[0]) return a.message.channel.send('A command with that name does not exist');

    // Duplicate Commands
    if (cmd[1]) return a.message.channel.send(error.message('1001'));

    // RoleId == Role#id, RoleName == Role#name
    let roleName;
    let roleId;
    let role = a.message.guild.roles.find('name', a.args[1]) || a.message.guild.roles.get(a.args[1]);
    if (role) {
      roleId = role.id;
      roleName = role.name;
    }
    else roleId = a.args[1];

    cmd[0].update({$pull: {"permissions": roleId}}).exec((err, result) => {
      if (err || !result.nModified > 0) return a.message.channel.send(`An error occured, could not remove that permission`)
      a.message.channel.send(`Successfully removed the role **${roleName || roleId}** from the command **${cmd[0].name}**`);
    });
  });
}
