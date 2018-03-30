const errors = {
  1001: 'Duplicate Commands',
  1002: 'Duplicate Actions',
  1003: 'Duplicate Permissions',
  1101: 'Action Type Not Valid',
  1102: 'Could Not Remove Action Refrences'
}

const message = (err) => {
  return ':no_entry_sign: ERR' + err + ' - ' + errors[err] + '. An error like this should never occur!\nPlease contact the developer for more information!\n\nSupport Guild: discord.gg/Jyj3esH';
}

module.exports = {
  errors,
  message
};
