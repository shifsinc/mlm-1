const calcBon = require('./bonuses.js');
const { initMysqlConnection, makeQueryAsync } = require('./utils.js');

async function f(){
  var _r;

  _r = await makeQueryAsync(`UPDATE users_stats SET
    stats_yt_left=0,
    stats_yt_right=0,
    stats_yt_sum_left=0,
    stats_yt_sum_right=0,
    stats_binary_cycles=0,
    stats_total_profit=0`);
  if( _r.status === 'error' ) return console.log(_r);

  _r = await makeQueryAsync(`DELETE FROM transactions WHERE
    tr_type='bonus_linear' OR
    tr_type='bonus_binary' OR
    tr_type='bonus_match' OR
    tr_type='bonus_lead' OR
    tr_type='bonus_extra'`);
  if( _r.status === 'error' ) return console.log(_r);

  _r = await makeQueryAsync(`DELETE FROM events WHERE event_type='bonus_start'`);
  if( _r.status === 'error' ) return console.log(_r);

  var r = await makeQueryAsync(`SELECT user_id, stats_purchase_sum FROM users_stats`);
  for(var i = 0 ; i < r.result.length ; i++){
    var u = r.result[i];

    _r = await makeQueryAsync(`UPDATE accounts SET
      account_balance=account_balance-(SELECT bonus_linear+bonus_binary+bonus_match+bonus_lead+bonus_extra FROM users_bonuses WHERE user_id=?)
    WHERE account_owner=?`, [ u.user_id, u.user_id]);
    if( _r.status === 'error' ) return console.log(_r);

    _r = await makeQueryAsync(`UPDATE users_bonuses SET
      bonus_linear=0,
      bonus_binary=0,
      bonus_match=0,
      bonus_lead=0,
      bonus_lead_counter=bonus_lead_counter_initial,
      bonus_extra=0,
      bonus_extra_counter=0,
      bonus_start_reached=0
    WHERE user_id=?`, [u.user_id]);
    if( _r.status === 'error' ) return console.log(_r);

    if( u.stats_purchase_sum > 0 ) 
      await calcBon(u.user_id, u.stats_purchase_sum, () => console.log(u.user_id, u.stats_purchase_sum, 'OK'), console.log);

  }
}


initMysqlConnection(f, console.log);
