const { makeQuery, checkUserPwd, getUserAccount, getUserByCode } = require('../../utils.js');
const { INCORRECT_QUERY, OK, USER_NOT_EXISTS, NOT_ENOUGH_MONEY } = require('../../const.js');

module.exports = function(callback, params, _user_id){/*amount, receiver, current_password*/
  var amount = parseInt( params.amount ), receiver = params.receiver, pwd = params.current_password;
  if( isNaN(amount) ) return callback( INCORRECT_QUERY );

  checkUserPwd(_user_id, pwd, r => {

    getUserAccount(_user_id, _acc => {
        if( _acc.account_balance < amount ) return callback( NOT_ENOUGH_MONEY );
        var sender_acc = _acc.account_id;

        getUserByCode(receiver, rec => {
          if( rec.user_id === _user_id )
            return callback({ status: 'error', text: 'transfer not possible', action: { text: 'Перевод не возможен' } });

          getUserAccount(rec.user_id, acc => {

            var receiver_acc = acc.account_id;
            makeQuery(`INSERT INTO transactions(tr_platform_amount, tr_sender_id, tr_receiver_id, tr_type)
              VALUES(?,?,?,?)`, [ amount, sender_acc, receiver_acc, 'internal' ], res => {
                callback(OK);
            }, callback);

        }, callback);
      }, callback);

    }, callback);

  }, callback);
}
