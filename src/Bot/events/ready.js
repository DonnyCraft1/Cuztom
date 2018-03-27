const config = require('../config.json');
module.exports = client => {
  console.log(client.user.username + ' is online');
}
