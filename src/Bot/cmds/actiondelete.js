// Import Model
const mongoose = require('mongoose');
const Action = require('../models/action');
const Command = require('../models/command');
const error = require('../util/error');

exports.run = a => {

  if (!a.args[0]) return a.message.channel.send('Please name your action');

  let query = Action.find({name: a.args[0], guild: a.message.guild.id});
  query.exec((err, action) => {

    // Check If Already Duplicate
    if (action[1]) {
      a.message.channel.send(error.message('1001'));
    }

    // Check If action Exist
    if (!action[0]) return a.message.channel.send(`This action does not exist`);

    // Remove All Refrences To This Action
    // Find All The Commands For This Guild
    Command.find({guild: a.message.guild.id}).exec(async (err, cmds) => {
      if (err) return a.message.channel.send(error.message(1102));

      await cmds.forEach(async cmd => {
        const result = await cmd.update({$pull: {"actions": new mongoose.Types.ObjectId(action[0]._id)}}).exec();
        a.message.channel.send(`Removed command **${cmd.name}'s** refrence to the action **${action[0].name}**`);
      });
    });

    // Remove All Documents
    query.remove().exec((err, result) => {
      if (err) return a.message.channel.send(`An error occured, couldn't delete the action`);
      a.message.channel.send(`Successfully deleted the action **${action[0].name}**`);
    });

  });
}
