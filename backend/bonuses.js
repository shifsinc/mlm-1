const { makeQueryAsync, beginTransaction, getPersonalRev } = require('./utils.js');
const {
  BINARY_CYCLE_AMOUNT,
  LINEAR_BONUS_VALUES,
  BINARY_BONUS_VALUES,
  MATCH_BONUS_VALUES, MATCH_BONUS_LEVELS,
  LEAD_BONUS_VALUE,
  START_BONUS_TIME, START_BONUS_VALUES,
  EXTRA_BONUS_TIME, EXTRA_BONUS_REV, EXTRA_BONUS_AMOUNT
} = require('./const.js');

async function _addTransaction(p, type){
  await makeQueryAsync(`INSERT INTO transactions(tr_real_amount, tr_platform_amount, tr_status, tr_sender_id, tr_receiver_id, tr_type)
    VALUES(?, ?, 'ok', (SELECT account_id FROM accounts WHERE account_owner=?), ?, '${type}')`, p);
}

async function calcStats(user, amount){
    var yt_left = user.stats_yt_left, yt_right = user.stats_yt_right,
      yt_sum_left = user.stats_yt_sum_left, yt_sum_right = user.stats_yt_sum_right;

    if( user.referal_dir === 'l' ){
      yt_left += amount;
      yt_sum_left += amount;
    } else {
      yt_right += amount;
      yt_sum_right += amount;
    }

    var binary_cycles = Math.min(
        Math.floor( yt_left / BINARY_CYCLE_AMOUNT ),
        Math.floor( yt_right / BINARY_CYCLE_AMOUNT )
      );
    var cycle_amount = binary_cycles * BINARY_CYCLE_AMOUNT;
    yt_left -= cycle_amount;
    yt_right -= cycle_amount;

    await makeQueryAsync(`UPDATE users_stats SET
      stats_yt_left=?,
      stats_yt_right=?,
      stats_yt_sum_left=?,
      stats_yt_sum_right=?,
      stats_binary_cycles=stats_binary_cycles+?
      WHERE user_id=?`,
      [ yt_left, yt_right, yt_sum_left, yt_sum_right, binary_cycles, user.user_id ]);

    user.stats_yt_left = yt_left;
    user.stats_yt_right = yt_right;
    user.stats_yt_sum_left = yt_sum_left;
    user.stats_yt_sum_right = yt_sum_right;
    user.stats_binary_cycles += binary_cycles;

    return binary_cycles;
}

async function linear(user, amount, init_user_id, level){
  if( level > 2 || user.user_rate === null ) return;
  var bonus = amount * LINEAR_BONUS_VALUES[ user.user_rate ][ level ];

  await makeQueryAsync(`UPDATE users_bonuses SET bonus_linear=bonus_linear+? WHERE user_id=?`, [ bonus, user.user_id ]);
  await _addTransaction([ amount, bonus, init_user_id, user.account_id ], 'bonus_linear');
}

async function binary(user, amount, init_user_id, level, binary_cycles){
  if( user.user_rate === null || binary_cycles === 0 ) return;

  if( user.user_refer_type !== null ){/*bonus conditions*/

    var sponsor_sum, personal_sum;
    if( user.user_refer_type === 'l' ){
      sponsor_sum = user.stats_yt_sum_left;
      personal_sum = user.stats_yt_sum_right;
    } else if( user.user_refer_type === 'r' ) {
      sponsor_sum = user.stats_yt_sum_right;
      personal_sum = user.stats_yt_sum_left;
    }
    if( personal_sum < 250 || sponsor_sum < 750 ) return;

  }

  var cycle_amount = binary_cycles * BINARY_CYCLE_AMOUNT;
  var bonus = cycle_amount * BINARY_BONUS_VALUES[ user.user_rate ];

  await makeQueryAsync(`UPDATE users_bonuses SET bonus_binary=bonus_binary+? WHERE user_id=?`, [ bonus, user.user_id ]);
  await _addTransaction([ amount, bonus, init_user_id, user.account_id ], 'bonus_binary');
}

async function match(user, amount, init_user_id, level){
  if( level > MATCH_BONUS_LEVELS[ user.user_status ] || user.user_rate === null ) return 0;
  var bonus = amount * MATCH_BONUS_VALUES[ user.user_rate ];

  await makeQueryAsync(`UPDATE users_bonuses SET bonus_match=bonus_match+? WHERE user_id=?`, [ bonus, user.user_id ]);
  await _addTransaction([ amount, bonus, init_user_id, user.account_id ], 'bonus_match');
}

async function lead(user, amount, init_user_id, level, binary_cycles){
  if( user.bonus_lead_counter == 0 ) return;
  var cycles = Math.min(binary_cycles, user.bonus_lead_counter);
  var cycle_amount = cycles * BINARY_CYCLE_AMOUNT;
  var bonus = cycle_amount * LEAD_BONUS_VALUE;

  await makeQueryAsync(`UPDATE users_bonuses SET bonus_lead=bonus_lead+?, bonus_lead_counter=bonus_lead_counter-?
      WHERE user_id=?`, [ bonus, cycles, user.user_id ]);
  await _addTransaction([ amount, bonus, init_user_id, user.account_id ], 'bonus_lead');
}

async function start(user, amount, init_user_id, level){
  if( level > 1 || user.user_rate === null ) return;

  var sum = await getPersonalRev(user.user_id);
  if( sum === null ) return;
  var time = new Date() - new Date( user.user_rate_ts );
  if( time < START_BONUS_TIME && sum > START_BONUS_VALUES[ user.user_rate ] && !user.bonus_start_reached ){
    await makeQueryAsync(`INSERT INTO events(user_id, event_type) VALUES(?, 'bonus_start')`, [ user.user_id ]);
    await makeQueryAsync(`UPDATE users_bonuses SET bonus_start_reached=1 WHERE user_id=?`, [ user.user_id ]);
  }
}

async function extra(user, amount, init_user_id, level){
  if( level > 1 ) return;
  var sum = await getPersonalRev(user.user_id);
  if( sum === null ) return;
  var bonus, counter = Math.floor( sum / EXTRA_BONUS_REV ),
    time = new Date() - new Date( user.user_rate_ts );

  if( time < EXTRA_BONUS_TIME && counter > user.bonus_extra_counter ){
    bonus = EXTRA_BONUS_AMOUNT * ( counter - user.bonus_extra_counter );
  } else return;

  await makeQueryAsync(`UPDATE users_bonuses SET bonus_extra=bonus_extra+?, bonus_extra_counter=? WHERE user_id=?`,
    [ bonus, counter, user.user_id ]);
  await _addTransaction([ amount, bonus, init_user_id, user.account_id ], 'bonus_extra');
}

async function traverseVisual(user_id, callback, level = 1){
  var res = await makeQueryAsync(`SELECT
    u.user_refer_type AS referal_dir,
    u1.*,
    s.*,
    b.*,
    a.account_id
    FROM users u
    JOIN users u1 ON u.user_tree_refer=u1.user_id
    JOIN users_stats s ON u1.user_id=s.user_id
    JOIN users_bonuses b ON u1.user_id=b.user_id
    JOIN accounts a ON u1.user_id=a.account_owner
    WHERE u.user_id=?`, [ user_id ]);
  if( res.status === 'error' ) return res;
  var r = res.result[0];

  if(r){
    await callback( r, level );
    return await traverseVisual(r.user_id, callback, level + 1);
  } else return 1;
}
async function traverseRefer(user_id, callback, level = 1){
  var res = await makeQueryAsync(`SELECT
    u.user_refer_type AS referal_dir,
    u1.*,
    s.*,
    b.*,
    a.account_id
    FROM users u
    JOIN users u1 ON u.user_refer=u1.user_id
    JOIN users_stats s ON u1.user_id=s.user_id
    JOIN users_bonuses b ON u1.user_id=b.user_id
    JOIN accounts a ON u1.user_id=a.account_owner
    WHERE u.user_id=?`, [ user_id ]);
  if( res.status === 'error' ) return res;
  var r = res.result[0];
  if(r){
    await callback( r, level );
    return await traverseRefer(r.user_id, callback, level + 1);
  } else return 1;
}

async function calc(user_id, amount, onSuccess, onError){
  var r;

  r = await traverseVisual(user_id, async (data, level) => {
    if( data.user_rate === null ) return;

    var binary_cycles = await calcStats(data, amount);

    var args = [ data, amount, user_id, level, binary_cycles ];
    await binary( ...args );
    await lead( ...args );
  });
  if( r !== 1 ) return onError(r);

  r = await traverseRefer(user_id, async (data, level) => {
    if( data.user_rate === null ) return;

    var args = [ data, amount, user_id, level ];
    await linear( ...args );
    await match( ...args );
    await start( ...args );
    await extra( ...args );
  });
  if( r !== 1 ) return onError(r);

  onSuccess();
}

module.exports = calc;
