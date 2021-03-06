const { makeQuery, checkUserPwd } = require('../../utils.js');
const { INCORRECT_QUERY, OK, ethereumRegexp, paypalRegexp } = require('../../const.js');

module.exports = function(callback, params, _user_id){/*ethereum, paypal, current_password*/
  var pwd = params.current_password;
  if( pwd === undefined ) return callback( INCORRECT_QUERY );

  checkUserPwd(_user_id, pwd, () => {

    var ethereum = params.ethereum, paypal = params.paypal,
      fields = [], values = [];
    if( ethereum !== undefined && ethereumRegexp.test(ethereum) ){
      fields.push('account_ethereum=?');
      values.push(ethereum);
    }
    /*if( paypal !== undefined && paypalRegexp.test(paypal) ){
      fields.push('account_paypal=?');
      values.push(paypal);
    }*/
    if( !fields.length ) return callback( INCORRECT_QUERY );
    //check acc exist

    makeQuery(`UPDATE accounts SET ` + fields.join(',') + ` WHERE account_owner=?`, [ ...values, _user_id ],
      res => {
        var resp = Object.assign({}, OK, { action: { text: 'Платежные данные успешно обновлены!' } });
        callback(resp);
      }, callback);

  }, callback);
}
