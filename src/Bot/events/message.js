// Require Required Files
const config = require('../config.json');
const customCmdHandler = require('../util/customCmdHandler');

module.exports = message => {
  // Checking
  if (message.author.bot) return;
  if (!message.guild) return(message.channel.send('My commands cannot be use outside guilds!'));

  // Setting variables
  const client = message.client;
	const args = message.content.split(' ');
	const command = args.shift().slice(config.prefix.length);
	const result = args.join(' ');


  if (!message.content.startsWith(config.prefix)) {
    if (!message.content.startsWith(config.customCmdPrefix)) return;
    customCmdHandler.run({command, client, message, args, result, config});
    return;
  }

  if (!message.member.roles.exists('name', config.permissionRole)) return message.channel.send(`You need to have a role named **${config.permissionRole}** to manage my commands!`);
  //  Finding command
  try {
		let cmdFile = require(`../cmds/${command}`);
	  cmdFile.run({client, message, args, result, config});
    return;
	} catch (err) {
		return console.log(`Command ${command} failed\n${err.stack}`);
	}
};
