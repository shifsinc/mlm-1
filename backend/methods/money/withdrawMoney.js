const { makeQuery } = require('../../utils.js');
const { INCORRECT_QUERY } = require('../../const.js');

module.exports = function(callback, params, _user_id){/**/
  callback({ status: 'error', action: { text: 'Недостаточно средств' } });
}
