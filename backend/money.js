const { makeQuery, beginTransaction, getUserAccount } = require('./utils.js');
const calcBonuses = require('./bonuses.js');
const { NOT_ENOUGH_MONEY, TRANSACTION_NOT_EXISTS, FORBIDDEN } = require('./const.js');

module.exports.spendMoney = function(user_id, amount, onSuccess, onError){
  getUserAccount(user_id, acc => {
    if( acc.account_balance < amount ) return onError( NOT_ENOUGH_MONEY );

    beginTransaction( con => {
      const onErr = e => {
        con.rollback();
        onError(e);
      }
      makeQuery(`UPDATE accounts SET
        account_balance=account_balance-?,
        account_last_payment_ts=CURRENT_TIMESTAMP
        WHERE account_owner=?`,
        [ amount, user_id ], () => {
          makeQuery(`UPDATE users_stats SET stats_purchase_sum=stats_purchase_sum+? WHERE user_id=?`, [ amount, user_id ], () => {
            calcBonuses(user_id, amount, () => onSuccess(con.commit.bind(con), con.rollback.bind(con)), onErr);
          }, onErr);
      }, onErr);
    }, onError);

  }, onError);
}

module.exports.confirmTransaction = function(tr_id, onSuccess, onError){
  makeQuery(`SELECT tr_status FROM transactions WHERE tr_id=?`, [ tr_id ],
    res => {
      if( !res.result.length ) return onError( TRANSACTION_NOT_EXISTS );
      if( res.result[0].tr_status !== 'wait' ) return onError( FORBIDDEN );

      makeQuery(`UPDATE transactions SET tr_status='ok' WHERE tr_id=?`, [ tr_id ], () => {
        onSuccess();
      }, onError);

    }, onError);
}
module.exports.rejectTransaction = function(tr_id, onSuccess, onError){
  makeQuery(`SELECT tr_status FROM transactions WHERE tr_id=?`, [ tr_id ],
    res => {
      if( !res.result.length ) return onError( TRANSACTION_NOT_EXISTS );
      if( res.result[0].tr_status !== 'wait' ) return onError( FORBIDDEN );

      makeQuery(`UPDATE transactions SET tr_status='rejected' WHERE tr_id=?`, [ tr_id ], res => {
        onSuccess();
      }, onError);

    }, onError);
}
