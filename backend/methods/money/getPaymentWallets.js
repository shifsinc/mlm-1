const { makeQuery } = require('../../utils.js');
const { ADMIN_ETH, ADMIN_PAYPAL } = require('../../config.js');

module.exports = function(callback, params, _user_id){/**/
  callback({ status: 'ok', result: {
    eth_wallet: ADMIN_ETH,
    paypal_wallet: ADMIN_PAYPAL
  } });
}
