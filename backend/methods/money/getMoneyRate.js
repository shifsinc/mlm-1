const { makeQuery } = require('../../utils.js');
const { INCORRECT_QUERY } = require('../../const.js');

module.exports = function(callback, params, _user_id){/**/
  callback({ status: 'ok', result: { eth_rate: 0.005882, usd_rate: 321 } });
}
