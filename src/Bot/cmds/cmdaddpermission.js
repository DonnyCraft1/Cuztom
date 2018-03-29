// Import Model
const Command = require('../models/command');
const error = require('../util/error');


exports.run = a => {

  // Check If All Arguments Are Not Undefined
  if (!a.args[0]) return a.message.channel.send('Please name your command');
  if (!a.args[1]) return a.message.channel.send('Please name your permission role');

  Command.find({name: a.args[0], guild: a.message.guild.id}).exec((err, cmd) => {

    // The Command Was Not Found
    if (!cmd[0]) {
      return a.message.channel.send('A command with that name does not exist');
    }

    // Duplicate Commands
    if (cmd[1]) {
      return a.message.channel.send(error.message('1001'));
    }

    let role = a.message.guild.roles.get(a.args[1]) || a.message.guild.roles.find('name', a.args[1]);
    if (!role) return a.message.channel.send(`I did not find the role **${a.args[1]}**`);

    // Duplicate Permission && Already Added
    let alreadyExist = 0;
    cmd[0].permissions.forEach(perm => {
      if (perm = role.id) {
        alreadyExist += 1;
      }
    });

    // If Two Or More Of Same Action Already Added, Return Duplicate Error
    if (alreadyExist > 1) return a.message.channel.send(error.message('1003'));
    // If One Action Already Added, Return Already Added Message
    if (alreadyExist > 0) return a.message.channel.send('This permission is already added to this command');

    cmd[0].update({$push: {permissions: role.id}}, (err, result) => {
      if (err) return a.message.channel.send(`An error occured, i could not add the permission`);

      a.message.channel.send(`Successfully added permission role **${role.name}** to command **${a.args[0]}**`);
    });
  });
}
