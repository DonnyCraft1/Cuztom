// Import Model
const Command = require('../models/command');
const Action = require('../models/action');
const error = require('../util/error');
const replacePlaceholder = require('./replacePlaceholder');

// Will Always Run
exports.run = (a) => {
  Command.find({name: a.command, guild: a.message.guild.id}).populate('actions').exec((err, cmd) => {
    if (err) return console.log(err);
    if (!cmd[0]) return a.message.channel.send('No such command exist!');

    // Check If Duplicate
    if (cmd[1]) {
      return a.message.channel.send(error.message('1001'));
    }

    // The Command Exist

    // Add The Cmd To a //a.cmd == The Command Object Returned From MongoDB //a.command == The Command Name (String) That Was Executed By The User
    a.cmd = cmd[0];

    // Loop Trought The Actions And Call Their Function
    let actions = 0;
    cmd[0].actions.forEach((act, i) => {
      a.cmd.actions[i].value = replacePlaceholder.run(a.cmd.actions[i].value, a);
      switch(act.actionType) {
        case "0":
          type0(a, actions);
          break;
        case "1":
          type1(a, actions);
          break;
        default:
          _default(a, actions);
          break;
      }
      actions += 1;
    });
    if (actions === 0) return a.message.channel.send('This command does not have any actions');

  })
}

// MESSAGE
const type0 = (a, i) => {
  a.message.channel.send(a.cmd.actions[i].value);
}

// PRIVATEMESSAGE
const type1 = (a, i) => {
  a.message.author.send(a.cmd.actions[i].value);
}

// ADDROLE
const type2 = (a, i) => {

}

// REMOVEROLE
const type3 = (a, i) => {

}

// TOGGLEROLE
const type4 = (a, i) => {

}

// NICKNAME
const type5 = (a, i) => {

}

// KICK
const type6 = (a, i) => {

}

// BAN
const type7 = (a, i) => {

}

// Not One Them Above
const _default = (a, i) => {
  a.message.channel.send(error.message(1003))
}
