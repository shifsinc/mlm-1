const { makeQuery } = require('../utils.js');
const { INCORRECT_QUERY, OK, ethereumRegexp, paypalRegexp } = require('../const.js');

module.exports = function(callback, params, _user_id){/*ethereum, paypal*/
  var ethereum = params.ethereum, paypal = params.paypal,
    fields = [], values = [];
  if( ethereum !== undefined && ethereumRegexp.test(ethereum) ){
    fields.push('account_ethereum=?');
    values.push(ethereum);
  }
  if( paypal !== undefined && paypalRegexp.test(paypal) ){
    fields.push('account_paypal=?');
    values.push(paypal);
  }
  if( !fields.length ) return callback( INCORRECT_QUERY );
  //check acc exist

  makeQuery(`UPDATE accounts SET ` + fields.join(',') + ` WHERE account_id=
    (SELECT account_id FROM users WHERE user_id=?)`, [ ...values, _user_id ],
    res => {
      res = OK;
      res.action.text = 'Платежные данные успешно обновлены!';
      callback( res );
    }, callback);
}
