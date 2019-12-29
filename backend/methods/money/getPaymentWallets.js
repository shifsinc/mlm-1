const { makeQuery } = require('../../utils.js');

module.exports = function(callback, params, _user_id){/**/
  callback({ status: 'ok', result: {
    eth_wallet: 'bnb136ns6lfw4zs5hg4n85vdthaad7hq5m4gtkgf23',
    paypal_wallet: 'vitalycool@gmail.com'
  } });
}
