// Import Model
const Action = require('../models/action');
const error = require('../util/error');

exports.run = a => {

  if (!a.args[0]) return a.message.channel.send('Please name your action');

  Action.find({name: a.args[0], guild: a.message.guild.id}).exec((err, action) => {

    // Check If Already Duplicate
    if (action[1]) {
      return a.message.channel.send(error.message('1001'));
    }

    // Check If action Exist
    if (action[0]) {
      return a.message.channel.send(`There is already an action with the name **${action[0].name}**`);
    }

    Action.create({
      name: a.args[0],
      creator: a.message.author.id,
      guild: a.message.guild.id
    })
    .then(action => {
      a.message.channel.send('Successfully created the action ' + a.args[0]);
    });
  });
}
