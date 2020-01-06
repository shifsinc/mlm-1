const { makeQuery, checkUserPwd, getUserAccount } = require('../../utils.js');
const { INCORRECT_QUERY, OK,WITHDRAW_COMMISSION, NOT_ENOUGH_MONEY } = require('../../const.js');
const getMoneyRate = require('./getMoneyRate.js');

module.exports = function(callback, params, _user_id){/*amount, current_password*/
  var amount = parseInt( params.amount ), pwd = params.current_password;
  if( isNaN(amount) ) return callback( INCORRECT_QUERY );

  checkUserPwd(_user_id, pwd, () => {

    getUserAccount(_user_id, acc => {

      var acc_id = acc.account_id, balance = acc.account_balance;
      if( balance < amount ) return callback(NOT_ENOUGH_MONEY);
      getMoneyRate(r => {
        if( r.status === 'error' ) return callback(r);

        var ethAmount = amount * r.result.eth_rate;
        ethAmount -= ethAmount * WITHDRAW_COMMISSION;
        makeQuery(`INSERT INTO transactions(tr_real_amount, tr_platform_amount, tr_pay_method, tr_receiver_id, tr_type)
          VALUES(?,?,?,?,?)`, [ ethAmount, amount, 'ethereum', acc_id, 'out' ], res => {
            res = OK;
            res.action = { text: 'Заявка на вывод средств добавлена' };
            callback(res);
          }, callback);

      }, callback);

    }, callback);

  }, callback);

}
