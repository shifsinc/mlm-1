const { makeQuery } = require('../utils.js');
const { INCORRECT_QUERY } = require('../const.js');

module.exports = function(callback, params, _user_id){/**/
  callback({
    status: 'ok',
    result: {
      bonus_binary: 2035,
      bonus_match: 181.1,
      bonus_yoda: 150,
      bonus_linear1: 2806,
      bonus_linear2: 976.5,
      bonus_withdraws: 2476.3,
    } });
}
