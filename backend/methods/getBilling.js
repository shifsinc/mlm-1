const { makeQuery } = require('../utils.js');
const { INCORRECT_QUERY } = require('../const.js');

module.exports = function(callback, params, _user_id){/*ethereum, paypal*/
  makeQuery(`SELECT account_ethereum, account_paypal FROM accounts WHERE account_id=
    (SELECT account_id FROM users WHERE user_id=?)`, [ _user_id ],
    res => {
      res.result = res.result[0];
      callback(res);
    }, callback);
}
