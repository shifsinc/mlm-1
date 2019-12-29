const { makeQuery,  } = require('../../utils.js');
const { INCORRECT_QUERY, OK,WITHDRAW_COMMISSION } = require('../../const.js');
const getMoneyRate = require('./getMoneyRate.js');

module.exports = function(callback, params, _user_id){/*amount*/
  var amount = parseInt( params.amount );
  if( isNaN(amount) ) return callback( INCORRECT_QUERY );

  makeQuery(`SELECT account_id, account_balance FROM accounts WHERE account_owner=?`, [ _user_id ], res => {

    var acc_id = res.result[0].account_id, balance = res.result[0].account_balance;
    getMoneyRate(r => {
      if( r.status === 'error' ) return callback(r);
      if( balance < amount ) return callback({ status: 'error', action: { text: 'Недостаточно средств' } });

      var ethAmount = amount * r.result.eth_rate;
      ethAmount -= ethAmount * WITHDRAW_COMMISSION;
      makeQuery(`INSERT INTO transactions(tr_descr, tr_real_amount, tr_platform_amount, tr_pay_method, tr_receiver_id, tr_type)
        VALUES(?,?,?,?,?,?)`, [ 'Вывод средств', ethAmount, amount, 'ethereum', acc_id, 'out' ], res => {
          res = OK;
          res.action = { text: 'Заявка на вывод средств добавлена' };
          callback(res);
        }, callback);

    }, callback);

    });

}
