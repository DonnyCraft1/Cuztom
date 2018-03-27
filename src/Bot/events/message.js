const config = require('../config.json');
module.exports = message => {
  // Checking
  if (message.author.bot) return;
  if (!message.guild) return(message.channel.send('My commands cannot be use outside guilds!'));
  if (!message.content.startsWith(config.prefix)) return;


  // Setting variables
  const prefix = config.prefix;
  const client = message.client;
	const args = message.content.split(' ');
	const command = args.shift().slice(prefix.length);
	const result = args.join(' ');

  //  Finding command
  try {
		let cmdFile = require(`../cmds/${command}`);
	  cmdFile.run({client, message, args, result, config});
	} catch (err) {
		console.log(`Command ${command} failed\n${err.stack}`);
	}
};
