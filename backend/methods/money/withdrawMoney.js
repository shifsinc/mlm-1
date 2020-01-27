const { makeQuery, checkUserPwd, getUserAccount } = require('../../utils.js');
const { INCORRECT_QUERY, OK,WITHDRAW_COMMISSION, MIN_WITHDRAW_AMOUNT,
  NOT_ENOUGH_MONEY, NO_PAYMENT_INFO } = require('../../const.js');
const getMoneyRate = require('./getMoneyRate.js');

module.exports = function(callback, params, _user_id){/*amount, current_password*/
  var amount = parseInt( params.amount ), pwd = params.current_password;
  if( isNaN(amount) ) return callback( INCORRECT_QUERY );
  if( amount < MIN_WITHDRAW_AMOUNT )
    return callback({ status: 'error', text: 'amount less than minimum required', action: {
      text: 'Минимальная сумма для вывода: ' + MIN_WITHDRAW_AMOUNT
    } });

  checkUserPwd(_user_id, pwd, () => {

    getUserAccount(_user_id, acc => {

      var acc_id = acc.account_id, balance = acc.account_balance;
      if( acc.account_ethereum === null ) return callback(NO_PAYMENT_INFO);
      if( balance < amount ) return callback(NOT_ENOUGH_MONEY);
      getMoneyRate(r => {
        if( r.status === 'error' ) return callback(r);

        var ethAmount = amount * r.result.rate_eth;
        ethAmount -= ethAmount * WITHDRAW_COMMISSION;
        makeQuery(`INSERT INTO transactions(tr_real_amount, tr_platform_amount, tr_pay_method, tr_receiver_id, tr_type)
          VALUES(?,?,?,?,?)`, [ ethAmount, amount, 'ethereum', acc_id, 'out' ], res => {
            var resp = Object.assign({}, OK, { action: { text: 'Заявка на вывод средств добавлена' } });
            callback(resp);
          }, callback);

      }, callback);

    }, callback);

  }, callback);

}
