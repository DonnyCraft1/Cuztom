const config = require('../config.json');

module.exports = client => {
  console.log(client.user.username + ' is online');
  client.user.setPresence({
    game: {
      name: `${config.prefix}help`,
      type: 2
    },
    status: `dnd`
  });
}
