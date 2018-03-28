const errors = {
  1001: 'Duplicate Commands'
}

const message = (err) => {
  return ':no_entry_sign: ERR' + err + ' - ' + errors[err] + '. An error like this should newer occur!\nPlease contact the developer for more information!\n\nSupport Guild: discord.gg/Jyj3esH';
}

module.exports = {
  errors,
  message
};
