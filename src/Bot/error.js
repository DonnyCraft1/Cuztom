const errors = {
  1001: 'Duplicate Commands',
  1002: 'Access Denied. No Permission',
  1004: '',
  1005: '',
  1006: '',
  1007: '',
  1008: '',
  1009: '',
  1010: '',
  1011: ''
}

const message = (err) => {
  return ':no_entry_sign: ERR' + err + ' - ' + errors[err] + '. Please contact the developer for more information!\n\nSupport Guild: discord.gg/Jyj3esH';
}

module.exports = {
  errors,
  message
};
