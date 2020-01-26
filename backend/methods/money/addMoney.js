const { makeQuery, getUserAccount } = require('../../utils.js');
const { INCORRECT_QUERY, OK, PAY_METHOD_PAYPAL, PAY_METHOD_ETH, PAY_COMMISSION } = require('../../const.js');
const getMoneyRate = require('./getMoneyRate.js');

module.exports = function(callback, params, _user_id){/*payMethod, amount*/
  var payMethod = parseInt( params.payMethod ), amount = parseInt( params.amount );
  if( isNaN(payMethod) || isNaN(amount) ) return callback( INCORRECT_QUERY );

  getMoneyRate(r => {
    if( r.status === 'error' ) return callback(r);
    var rate = r.result, realTotal;

    /*if( payMethod === PAY_METHOD_PAYPAL ){
      realTotal = amount * rate.rate_usd * PAY_COMMISSION;
    } else */if( payMethod === PAY_METHOD_ETH ){
      realTotal = amount * rate.rate_eth * PAY_COMMISSION;
    } else return callback( INCORRECT_QUERY );

    getUserAccount(_user_id, acc => {
      if( acc.account_ethereum === undefined )
        return callback({ status: 'error', action: { text: 'Необходимо указать платежные данные' } });

      var acc_id = acc.account_id;
      makeQuery(`INSERT INTO transactions(tr_real_amount, tr_platform_amount, tr_pay_method, tr_receiver_id, tr_type)
        VALUES(?,?,?,?,?)`, [ realTotal.toFixed(5), amount, payMethod + 1, acc_id, 'in' ], res => {
          var resp = Object.assign({}, OK , { result: { total: realTotal, payMethod, transactionStatus: 'wait' } });
          callback(resp);
        }, callback);

    }, callback);

  });
}
