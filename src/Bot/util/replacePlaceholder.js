const moment = require('moment');


String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

// RUN Template
/*
"run": (inp, a, name) => {
  return inp.replaceAll('{' + name + '}', 'WITH');
}
*/


const placeholders = [
  {
    "name": "input",
    "run": (inp, a, name) => {
      return inp.replaceAll('{' + name + '}', a.result || '#input');
    }
  },
  {
    "name": "user",
    "run": (inp, a, name) => {
      return inp.replaceAll('{' + name + '}', a.message.author);
    }
  },
  {
    "name": "userid",
    "run": (inp, a, name) => {
      return inp.replaceAll('{' + name + '}', a.message.author.id);
    }
  },
  {
    "name": "username",
    "run": (inp, a, name) => {
      return inp.replaceAll('{' + name + '}', a.message.author.username);
    }
  },
  {
    "name": "userdiscriminator",
    "run": (inp, a, name) => {
      return inp.replaceAll('{' + name + '}', a.message.author.discriminator);
    }
  },
  {
    "name": "guildcount",
    "run": (inp, a, name) => {
      return inp.replaceAll('{' + name + '}', a.message.guild.memberCount);
    }
  },
  {
    "name": "guildid",
    "run": (inp, a, name) => {
      return inp.replaceAll('{' + name + '}', a.message.guild.id);
    }
  },
  {
    "name": "guildname",
    "run": (inp, a, name) => {
      return inp.replaceAll('{' + name + '}', a.message.guild.name);
    }
  },
  {
    "name": "date",
    "run": (inp, a, name) => {
      return inp.replaceAll('{' + name + '}', `${moment().date()}.${moment().month() + 1 /*Returns 0-11*/}.${moment().year()} ${moment().get('hour')}:${moment().get('minute')} UTC+2`);
    }
  }
];

exports.run = (inp, a) => {
  let newText = inp;
  for (let i = 0; i < placeholders.length; i++) {
    newText = placeholders[i].run(newText, a, placeholders[i].name);
  }
  return newText;
}
