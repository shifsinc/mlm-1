const { makeQuery } = require('../../utils.js');
const { INCORRECT_QUERY } = require('../../const.js');

module.exports = function(callback, params, _user_id){/**/
  makeQuery(`SELECT account_ethereum, account_paypal FROM accounts WHERE account_owner=?`, [ _user_id ],
    res => {
      res.result = res.result[0];
      callback(res);
    }, callback);
}
