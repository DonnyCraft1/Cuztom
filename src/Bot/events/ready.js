const config = require('../config.json');

module.exports = client => {
  console.log(client.user.username + ' is online');
  client.user.setPresence({
    game: {name: `${config.customCmdPrefix}help`},
    status: `dnd`
  });
}
