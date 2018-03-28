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

    // Find The Actions
    Action.find({name: a.args[1], guild: a.message.guild.id}).exec((err, action) => {

      // Check If The Action Exsists
      if (!action[0]) return a.message.channel.send('The action does not exist');

      // Duplicate Actions && Already Added
      let alreadyExist = 0;
      cmd[0].actions.forEach(cmdAct => {
        console.log(cmdAct, action[0]._id);
        if (cmdAct.equals(action[0]._id)) {
          alreadyExist += 1;
        }
      });

      // If Two Or More Of Same Action Already Added, Return Duplicate Error
      if (alreadyExist > 1) return a.message.channel.send(error.message('1002'));
      // If One Action Already Added, Return Already Added Message
      if (alreadyExist > 0) return a.message.channel.send('This action is already added to this command');

      // Updating
      cmd[0].update({$push: {actions: action[0]._id}}, (err, result) => {

        if (err) {
          console.log(err);
        } else {
          a.message.channel.send('Successfully added action **' + action[0].name + '** to command **' + cmd[0].name + '**');
        }
      })
    })
  });
}
