// Import Model
const Action = require('../models/action');
const error = require('../util/error');

exports.run = a => {

  if (!a.args[0]) return a.message.channel.send('Please name your action');

  Action.deleteMany({name: a.args[0], guild: a.message.guild.id}, (err, result) => {
    if (err || !result.n > 0) return a.message.channel.send(`I couldn't delete this action. It might not exist`);
    a.message.channel.send(`Successfully deleted action **${a.args[0]}**`);
  });
}
