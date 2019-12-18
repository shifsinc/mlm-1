const { makeQuery } = require('../utils.js');
const { INCORRECT_QUERY, OK } = require('../const.js');

module.exports = function(callback, params, _user_id){/*ethereum, paypal*/
  var ethereum = params.ethereum, paypal = params.paypal;
  if( ethereum === undefined || paypal === undefined ) return callback( INCORRECT_QUERY );
  //check acc exist

  makeQuery(`UPDATE accounts SET account_ethereum=?, account_paypal=? WHERE account_id=
    (SELECT account_id FROM users WHERE user_id=?)`, [ ethereum, paypal, _user_id ],
    res => {
      res = OK;
      res.action.text = 'Платежные данные успешно обновлены!';
      callback( res );
    }, callback);
}
