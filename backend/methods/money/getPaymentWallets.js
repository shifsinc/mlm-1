const { makeQuery } = require('../../utils.js');

module.exports = function(callback, params, _user_id){/**/
  callback({ status: 'ok', result: {
    eth_wallet: '0x373856e432f80d8170573284579c84be3d488a1e',
    paypal_wallet: 'vitalycool@gmail.com'
  } });
}
