const config = require('../config');

const isDev = id => {
  let userIsDev = false;
  config.devs.forEach(dev => {
    if (id == dev.id) {
      userIsDev = true;
    }
  });
  return userIsDev;
}

exports.is = isDev;