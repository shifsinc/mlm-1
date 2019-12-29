const { makeQuery } = require('../../utils.js');
const { INCORRECT_QUERY, OK } = require('../../const.js');

module.exports = function(callback, params, _user_id){/*amount, receiver, current_password*/
  var amount = parseInt( params.amount );

  getMoneyRate(r => {
    if( r.status === 'error' ) return callback(r);
    var rate = r.result, realTotal;

    if( payMethod === PAY_METHOD_PAYPAL ){
      realTotal = amount * rate.usd_rate * PAY_COMMISSION;
    } else if( payMethod === PAY_METHOD_ETH ){
      realTotal = amount * rate.eth_rate * PAY_COMMISSION;
    } else return callback( INCORRECT_QUERY );

    makeQuery(`SELECT account_id FROM accounts WHERE account_owner=?`, [ _user_id ], res => {

      var acc_id = res.result[0].account_id;
      makeQuery(`INSERT INTO transactions(tr_descr, tr_real_amount, tr_platform_amount, tr_pay_method, tr_receiver_id, tr_type)
        VALUES(?,?,?,?,?,?)`, [ 'Пополнение баланса', realTotal, amount, payMethod + 1, acc_id, 'in' ], res => {
          res = OK;
          res.result = { total: realTotal, payMethod, transactionStatus: 'wait' }
          callback(res);
        }, callback);

    }, callback);

  });

}
