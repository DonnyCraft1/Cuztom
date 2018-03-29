// Import Model
const Action = require('../models/action');
const error = require('../util/error');

exports.run = a => {
  // Check if a name is provided
  if (!a.args[0]) return a.message.channel.send(`Please name your action`);
  let value = a.result.substring(a.args[0].length + 1);
  if (!value) return a.message.channel.send(`Please provide a new value for the action`);

  // Find the action
  Action.find({name: a.args[0], guild: a.message.guild.id}).exec((err, action) => {
    if (!action[0]) return a.message.channel.send(`I did not find the action`);
    if (action[1]) return a.message.channel.send(error.message(1002));

    action[0].update({value: value}, (err, result) => {
      if (err || !result.n > 0) return a.message.channel.send(`An error occured, couldn't update action value`);
      a.message.channel.send(`Successfully updated the value of action **${action[0].name}** to **${value}**`);
    });
  });
}
