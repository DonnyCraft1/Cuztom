// Import Model
const Command = require('../models/command');
const Action = require('../models/action');
const error = require('../util/error');

exports.run = a => {

  // Check If All Arguments Are Not Undefined
  if (!a.args[0]) return a.message.channel.send('Please name your command');
  if (!a.args[1]) return a.message.channel.send('Please name your action');

  // Try To Find The Command
  Command.find({name: a.args[0], guild: a.message.guild.id}).exec((err, cmd) => {

    // The Command Was Not Found
    if (!cmd[0]) return a.message.channel.send('A command with that name does not exist');

    // Duplicate Commands
    if (cmd[1]) return a.message.channel.send(error.message('1001'));

    Action.find({name: a.args[1], guild: a.message.guild.id}).exec((err, act) => {

      // Duplicate Actions
      if (act[1]) return a.message.channel.send(error.message('1002'));

      let actionId = act[0] ? act[0]._id : a.args[1];

      cmd[0].update({$pull: {"actions": actionId}}).exec((err, result) => {
        if (err || !result.nModified > 0) return a.message.channel.send(`I couldn't remove the action. It might already be removed`);
        a.message.channel.send(`Successfully removed action **${a.args[1]}** from command **${a.args[0]}**`);
      })

    });
  });
}
