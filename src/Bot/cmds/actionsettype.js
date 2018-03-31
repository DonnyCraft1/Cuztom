// Import Model
const Action = require('../models/action');
const error = require('../util/error');
const actiontype = require('../util/actiontype');

exports.run = a => {
  // Check if a name is provided
  if (!a.args[0]) return a.message.channel.send(`Please name your action`);
  if (!a.args[1]) return a.message.channel.send(`Please provide a new type for the action`);

  // Get The Type Number
  let indexType = actiontype.types.indexOf(a.args[1].toUpperCase());

  // Find the action
  Action.find({name: a.args[0], guild: a.message.guild.id}).exec((err, action) => {
    if (!action[0]) return a.message.channel.send(`I did not find the action`);
    if (action[1]) return a.message.channel.send(error.message(1002));
    if (indexType == -1) return a.message.channel.send(`Invalid action type`);

    action[0].update({actionType: indexType}, (err, result) => {
      if (err || !result.n > 0) return a.message.channel.send(`An error occured, couldn't update action type`);
      a.message.channel.send(`Successfully set the type of action **${action[0].name}** to **${a.args[1]}**`);
    });
  });
}
