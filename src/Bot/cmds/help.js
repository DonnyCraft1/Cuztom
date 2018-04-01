const Discord = require('discord.js');
const fs = require('fs');

exports.run = a => {

  const embed = new Discord.RichEmbed()
    .setColor(3447003)
    .setTitle(`Cuztom - The Custom Command Bot`)

    .setDescription(`
      Hi! I'm ***[Cuztom](https://discordapp.com/oauth2/authorize?client_id=422382447523528714&scope=bot&permissions=8)***.
      Unlike other bots, I have no limitations for custom commands.
      This bot is realy powerfull and customizable!
      We also have a really helpfull support guild, and it's really easy to get started.
    `)

    .addField(`Contact`, `
      Join my **[guild](https://discord.gg/Jyj3esH)** for support!
      Check out the **[wiki (under dev)](https://github.com/DonnyCraft1/Cuztom/wiki)** to get started!
    `)

    .addField(`Get Started`, `
      \`${a.config.prefix}cmdcreate <name>\` creates a new command
      \`${a.config.prefix}actioncreate <name>\` creates a new action
      \`${a.config.prefix}cmdaddaction <command> <action>\` adds an action to a command

      \`${a.config.customCmdPrefix}\` is the prefix for custom commands
      \`${a.config.customCmdPrefix}<commandname>\` runs the custom command

      Good luck! For more detailed information, please visit the **[support guild](https://discord.gg/Jyj3esH)**, or the **[wiki (under dev)](https://github.com/DonnyCraft1/Cuztom/wiki)**!
    `);

  a.message.channel.send({embed});
}
