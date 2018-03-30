// Import Model
const Command = require('../models/command');
const Action = require('../models/action');
const error = require('../util/error');
const replacePlaceholder = require('./replacePlaceholder');

// Will Always Run
exports.run = (a) => {
  Command.find({name: a.command, guild: a.message.guild.id}).populate('actions').exec((err, cmd) => {
    if (err) return console.log(err);
    if (!cmd[0]) return a.message.channel.send(`There is no custom command called **${a.command}**. Commands are case sensitive!`);

    // Check If Duplicate
    if (cmd[1]) {
      return a.message.channel.send(error.message('1001'));
    }

    // Check If User Has All Required Permissions
    let missingPerms = [];
    cmd[0].permissions.forEach((perm, i) => {

      // Trying To Find Permission Name
      let roleName = a.message.guild.roles.get(perm);
      if (roleName) roleName = roleName.name;
      else roleName = perm + ' - Warning, this role does not exist!';

      if (!a.message.member.roles.has(perm)) missingPerms.push(roleName);
    });

    if (missingPerms.length > 0) {
      return a.message.channel.send(`**Missing Permission(s) / Role(s)**\n- ${missingPerms.join('\n- ')}`);
    }

    // Add The Cmd To Object a //a.cmd == The Command Object Returned From MongoDB //a.command == The Command Name (String) That Was Executed By The User
    a.cmd = cmd[0];

    // Loop Trought The Actions And Call Their Function
    let actions = 0;
    cmd[0].actions.forEach((act, i) => {

      a.cmd.actions[i].value = replacePlaceholder.run(a.cmd.actions[i].value, a);

      let action = a.cmd.actions[i];

      switch(act.actionType) {
        case "0":
          type0(a, actions, action); // args, index, action
          break;
        case "1":
          type1(a, actions, action);
          break;
        case "2":
          type2(a, actions, action);
          break;
        case "3":
          type3(a, actions, action);
          break;
        case "4":
          type4(a, actions, action);
          break;
        case "5":
          type5(a, actions, action);
          break;
        case "6":
          type6(a, actions, action);
          break;
        case "7":
          type7(a, actions, action);
          break;
        default:
          _default(a, actions, action);
          break;
      }
      actions += 1;
    });
    if (actions === 0) return a.message.channel.send('This command does not have any actions');

  })
}

// MESSAGE
const type0 = (a, i, action) => {
  a.message.channel.send(a.cmd.actions[i].value);
}

// PRIVATEMESSAGE
const type1 = (a, i, action) => {
  a.message.author.send(a.cmd.actions[i].value);
}

// ADDROLE
const type2 = (a, i, action) => {
  let role = a.message.guild.roles.find('name', a.cmd.actions[i].value) || a.message.guild.roles.get(a.cmd.actions[i].value);
  if (!role) return a.message.channel.send(`The role **${a.cmd.actions[i].value}** was not found!`);

  a.message.member.addRole(role, `The command ${a.command} told me to add this role`)
    .then(() => {
      a.message.channel.send(`User **${a.message.member.displayName}** was given the role **${role.name}**`);
    })
    .catch((err) => {
      a.message.channel.send(`I was not able to give you the role **${role.name}** I may miss permissions`);
    })
}

// REMOVEROLE
const type3 = (a, i, action) => {
  let role = a.message.guild.roles.find('name', a.cmd.actions[i].value) || a.message.guild.roles.get(a.cmd.actions[i].value);
  if (!role) return a.message.channel.send(`The role **${a.cmd.actions[i].value}** was not found!`);

  a.message.member.removeRole(role, `The command ${a.command} told me to remove this role`)
    .then(() => {
      a.message.channel.send(`User **${a.message.member.displayName}** was removed the role **${role.name}**`);
    })
    .catch((err) => {
      a.message.channel.send(`I was not able to remove the role **${role.name}**. I may miss permissions`);
    })
}

// TOGGLEROLE
const type4 = (a, i, action) => {
  let role = a.message.guild.roles.find('name', a.cmd.actions[i].value) || a.message.guild.roles.get(a.cmd.actions[i].value);
  if (!role) return a.message.channel.send(`The role **${a.cmd.actions[i].value}** was not found!`);

  if (a.message.member.roles.has(role.id)) {

    // Remove Role If Member Already Have The Role
    a.message.member.removeRole(role, `The command ${a.command} told me to remove this role`)
      .then(() => {
        a.message.channel.send(`User **${a.message.member.displayName}** was removed the role **${role.name}**`);
      })
      .catch((err) => {
        a.message.channel.send(`I was not able to remove the role **${role.name}**. I may miss permissions`);
      })

  } else {

    // Add Role If Member Don't Have Role
    a.message.member.addRole(role, `The command ${a.command} told me to add this role`)
      .then(() => {
        a.message.channel.send(`User **${a.message.member.displayName}** was given the role **${role.name}**`);
      })
      .catch((err) => {
        a.message.channel.send(`I was not able to give you the role **${role.name}**. I may miss permissions`);
      })
  }
}

// NICKNAME !!NEED TESTING!!
const type5 = (a, i, action) => {
  a.message.member.setNickname(a.cmd.actions[i].value)
    .then(() => {
      a.message.channel.send(`**${a.message.member.displayName}'s'** nickname was set to **${a.cmd.actions[i].value}**`);
    })
    .catch((err) => {
      a.message.channel.send(`I was not able to edit your nickname. I may miss permissions`);
    })
}

// KICK
const type6 = (a, i, action) => {

  let member = a.message.guild.members.get(action.value) ||
  a.message.guild.members.find('nickname', action.value) ||
  a.message.guild.members.find('displayName', action.value) ||
  a.message.mentions.members.first();

  console.log(action.value);

  if (!member) return a.message.channel.send(`I did not find **${action.value}**`);

  member.kick(`The command ${a.command} told me to kick ${member.displayName}`)
    .then(() => {
      a.message.channel.send(`Kicked ${member.displayName}`);
    })
    .catch((err) => {
      a.message.channel.send(`I was not able to kick user **${member.displayName}**. I may miss permissions`);
    })
}

// BAN
const type7 = (a, i, action) => {
  let member = a.message.guild.members.get(action.value) ||
  a.message.guild.members.find('nickname', action.value) ||
  a.message.guild.members.find('displayName', action.value) ||
  a.message.mentions.members.first();

  console.log(action.value);

  if (!member) return a.message.channel.send(`I did not find **${action.value}**`);

  member.ban(`The command ${a.command} told me to ban ${member.displayName}`)
    .then(() => {
      a.message.channel.send(`Kicked ${member.displayName}`);
    })
    .catch((err) => {
      a.message.channel.send(`I was not able to ban user **${member.displayName}**. I may miss permissions`);
    })
}

// Not One Them Above
const _default = (a, i) => {
  a.message.channel.send(error.message(1101))
}
