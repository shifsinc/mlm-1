const { makeQuery } = require('../../utils.js');

module.exports = function(callback, params, _user_id){/*user_id*/
  var user_id = params.user_id;
  if( user_id === undefined || isNaN( user_id ) ) user_id = _user_id;

  makeQuery(`SELECT
    account_balance,
    account_withdraws,
    account_last_payment_ts
    FROM accounts
    WHERE account_owner=?`, [ user_id ],
    res => {
      res.result = res.result[0];
      callback(res);
  }, callback);
}
