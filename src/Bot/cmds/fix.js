// This Command Fixes All Duplicates And Removes All Refrences To Deleted Actions
// This Is Not Priority
// TODO: Create fix command

const Action = require('../models/action');
const Command = require('../models/command');
const error = require('../util/error');
const dev = require('../util/dev');
const wait = ms => new Promise((r, j)=>setTimeout(r, ms))
const suffixRegex = /(\(\d*\))+$/;

// The Guild ID
let guild;

exports.run = async a => {
  
  // Setup, Get Guild ID
  if (a.args[0]) {
    if(!dev.is(a.message.author.id)) return a.message.channel.send(`Leave the args, you do not have permission to choose a guild!`);
    guild = a.args[0];
  } else {
    guild = a.message.guild.id;
  }
  await a.message.channel.send(`Fixing guild **${a.client.guilds.get(guild) ? a.client.guilds.get(guild).name : guild}'s** problems!`);
  
  /*
  // Status messages
  */
  
  let actionMsg = await a.message.channel.send(`**#** Cleaning up actions`);
  let commandMsg = await a.message.channel.send(`**#** Cleaning up commands`);
  let refrencesMsg = await a.message.channel.send(`**#** Cleaning up all action refrences`);
  
  
  /*
  // TODO: Duplicate Actions //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  */
  actionMsg = await actionMsg.edit(`**~** Cleaning up actions`);
  await wait(1000);
  
  // Get Rid Of Suffix
  const suffixActions = await Action.find({guild: guild}).exec();
  const promises = suffixActions.map( async (act, i) => {
    let newActName;
    m = suffixRegex.exec(act.name);
    if (m) {
      newActName = act.name.substring(0, m.index);
      suffixActions[i].name = newActName;
      await suffixActions[i].save();
      console.log('Saved!');
    }
  });
  await Promise.all(promises);
  
  // Find All The Actions
  console.log('Hey There!');
  const actions = await Action.find({guild: guild}).exec();

  
  // Loop Trough All The Actions
  await actions.forEach( async (act, i) => {
    
    // Change The Name With Timeout Set To 200 Times
    for (let j = 0; j < 200; j++) {
      
      // Suffix Is The Number Added Behind The Name If Duplicates
      let suffix = (j == 0) ? '' : `(${j})`
      
      // Filter Out The Actions With The Same Name, To See The Difference
      let testActions = actions.filter((testAct) => {
        return testAct.name != act.name + suffix;
      });
      
      // Calculate The Difference
      let difference = actions.length - testActions.length;
      
      // If Not Duplicates      
      // When j Is 0, There Is One More In Difference Because The Action Itself counts. When j Is More Than 0, It Is Not Included In The Difference
      if ((difference < 2 && j == 0) || (difference == 0 && j > 0)) {
        // If The Name Was Not Changed
        if (j == 0) {
          // Exit The Loop
          break;
          
        // If The Name Was Changed
        } else {
          actions[i].name = act.name + suffix;
          const savedAction = await actions[i].save();
          break;
        }
      }
    }
  });
  
  
  // Update Status Message
  actionMsg = await actionMsg.edit(`**✓** Cleaning up actions`);
  
  /*
  // TODO: Duplicate Commands //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  */
  commandMsg = await commandMsg.edit(`**~** Cleaning up commands`);
  await wait(1000);
  
  // Get Rid Of Suffix
  const suffixCommands = await Command.find({guild: guild}).exec();
  const promises2 = suffixCommands.map( async (cmd, i) => {
    let newCmdName;
    m = suffixRegex.exec(cmd.name);
    if (m) {
      newCmdName = cmd.name.substring(0, m.index);
      suffixCommands[i].name = newCmdName;
      await suffixCommands[i].save();
      console.log('Saved!');
    }
  });
  await Promise.all(promises2);
  
  // Find All The Commands
  console.log('Hey There!');
  const commands = await Command.find({guild: guild}).exec();
  
  
  // Loop Trough All The Commands
  await commands.forEach( async (cmd, i) => {
    
    // Change The Name With Timeout Set To 200 Times
    for (let j = 0; j < 200; j++) {
      
      // Suffix Is The Number Added Behind The Name If Duplicates
      let suffix = (j == 0) ? '' : `(${j})`
      
      // Filter Out The Commands With The Same Name, To See The Difference
      let testCommands = commands.filter((testCmd) => {
        return testCmd.name != cmd.name + suffix;
      });
      
      // Calculate The Difference
      let difference = commands.length - testCommands.length;
      
      // If Not Duplicates      
      // When j Is 0, There Is One More In Difference Because The Command Itself counts. When j Is More Than 0, It Is Not Included In The Difference
      if ((difference < 2 && j == 0) || (difference == 0 && j > 0)) {
        // If The Name Was Not Changed
        if (j == 0) {
          // Exit The Loop
          break;
          
        // If The Name Was Changed
        } else {
          commands[i].name = cmd.name + suffix;
          const savedCommand = await commands[i].save();
          break;
        }
      }
    }
  });
  
  
  // Update Status Message
  commandMsg = await commandMsg.edit(`**✓** Cleaning up commands`);
  
  /*
  // TODO: Refrences To Deleted Action //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  */
  refrencesMsg = await refrencesMsg.edit(`**~** Cleaning up all action refrences`);
  await wait(1000);
  
  // Update Status Message
  refrencesMsg = await refrencesMsg.edit(`**✓** Cleaning up all action refrences`);
}