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
    if (!cmd[0]) {
      return a.message.channel.send('A command with that name does not exist');
    }

    // Duplicate Commands
    if (cmd[1]) {
      return a.message.channel.send(error.message('1001'));
    }

    // See if the action exist
    Action.find({name: a.args[1], guild: a.message.guild.id}).exec((err, action) => {

      // Updating
      cmd[0].update({actions: cmd[0].actions.concat(action._id)}).then((err, update) => {
        console.log(err, update);
      })
      //Command.findOneAndUpdate({name: a.args[0], guild: a.message.guild.id}, update, options, callback)
    })
  });
}
