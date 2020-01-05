const { makeQuery, beginTransaction, getUserAccount } = require('./utils.js');
const calcBonuses = require('./bonuses.js');
const { NOT_ENOUGH_MONEY } = require('./const.js');

module.exports.spendMoney = function(user_id, amount, onSuccess, onError){
  getUserAccount(user_id, acc => {
    if( acc.account_balance < amount ) return onError( NOT_ENOUGH_MONEY );

    beginTransaction( con => {
      const onErr = e => {
        con.rollback();
        onError(e);
      }
      makeQuery(`UPDATE accounts SET account_balance=account_balance-? WHERE account_owner=?`, [ amount, user_id ], () => {
        makeQuery(`UPDATE users_stats SET stats_purchase_sum=stats_purchase_sum+? WHERE user_id=?`, [ amount, user_id ], () => {
          calcBonuses(user_id, amount, () => onSuccess(con.commit.bind(con), con.rollback.bind(con)), onErr);
        }, onErr);
      }, onErr);
    }, onError);

  }, onError);
}

module.exports.confirmTransaction = function(tr_id, onSuccess, onError){
  makeQuery(`UPDATE transactions SET tr_status='ok' WHERE tr_id=?`, [ tr_id ], res => {
    onSuccess();
  }, onError);
}
module.exports.rejectTransaction = function(tr_id, onSuccess, onError){
  makeQuery(`UPDATE transactions SET tr_status='rejected' WHERE tr_id=?`, [ tr_id ], res => {
    onSuccess();
  }, onError);
}
