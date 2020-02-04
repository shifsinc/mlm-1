const { makeQuery, getPersonalRev } = require('./utils.js');
const {
  BINARY_CYCLE_AMOUNT,
  LINEAR_BONUS_VALUES,
  BINARY_BONUS_VALUES,
  MATCH_BONUS_VALUES, MATCH_BONUS_LEVELS,
  LEAD_BONUS_VALUE,
  START_BONUS_TIME, START_BONUS_VALUES,
  EXTRA_BONUS_TIME, EXTRA_BONUS_REV, EXTRA_BONUS_AMOUNT
} = require('./const.js');

function calcStats(user, amount){
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

    makeQuery(`UPDATE users_stats SET
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

function linear(user, amount, level){
  if( level > 2 || user.user_rate === null ) return;
  var bonus = amount * LINEAR_BONUS_VALUES[ user.user_rate ][ level ];

  makeQuery(`UPDATE users_bonuses SET bonus_linear=bonus_linear+? WHERE user_id=?`, [ bonus, user.user_id ]);
}

function binary(user, amount, level, binary_cycles){
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

  makeQuery(`UPDATE users_bonuses SET bonus_binary=bonus_binary+? WHERE user_id=?`, [ bonus, user.user_id ]);
}

function match(user, amount, level){
  if( level > MATCH_BONUS_LEVELS[ user.user_status ] || user.user_rate === null ) return 0;
  var bonus = amount * MATCH_BONUS_VALUES[ user.user_rate ];

  makeQuery(`UPDATE users_bonuses SET bonus_match=bonus_match+? WHERE user_id=?`, [ bonus, user.user_id ]);
}

function lead(user, amount, level, binary_cycles){
  if( user.bonus_lead_counter == 0 ) return;
  var cycles = ( binary_cycles > user.bonus_lead_counter ) ? user.bonus_lead_counter : binary_cycles;
  var cycle_amount = cycles * BINARY_CYCLE_AMOUNT;
  var bonus = cycle_amount * LEAD_BONUS_VALUE;

  makeQuery(`UPDATE users_bonuses SET bonus_lead=bonus_lead+?, bonus_lead_counter=bonus_lead_counter-?
      WHERE user_id=?`, [ bonus, cycles, user.user_id ]);
}

function start(user, amount, level){
  if( level > 1 || user.user_rate === null ) return;
  getPersonalRev(user.user_id, sum => {

    var time = new Date() - new Date( user.user_rate_ts );
    if( time < START_BONUS_TIME && sum > START_BONUS_VALUES[ user.user_rate ] && !user.bonus_start_reached ){
      makeQuery(`INSERT INTO events(user_id, event_type) VALUES(?, 'bonus_start')`, [ user.user_id ]);
      makeQuery(`UPDATE users_bonuses SET bonus_start_reached=1 WHERE user_id=?`, [ user.user_id ]);
    }

  });
}

function extra(user, amount, level){
  if( level > 1 ) return;
  getPersonalRev(user.user_id, sum => {

    var bonus, counter = Math.floor( sum / EXTRA_BONUS_REV ),
      time = new Date() - new Date( user.user_rate_ts );

    if( time < EXTRA_BONUS_TIME && counter > user.bonus_extra_counter ){
      bonus = EXTRA_BONUS_AMOUNT * ( counter - user.bonus_extra_counter );
      makeQuery(`UPDATE users_stats SET bonus_extra_counter=? WHERE user_id=?`, [ counter, user.user_id ]);
    } else return;


    makeQuery(`UPDATE users_bonuses SET bonus_extra=bonus_extra+?, bonus_extra_counter=? WHERE user_id=?`,
      [ bonus, counter, user.user_id ]);

  });
}

function calc(user_id, amount, onSuccess, onError, level = 1){
  makeQuery(`SELECT
    u.user_refer_type AS referal_dir,
    u1.*,
    s.*,
    b.*
    FROM users u
    JOIN users u1 ON u.user_tree_refer=u1.user_id
    JOIN users_stats s ON u1.user_id=s.user_id
    JOIN users_bonuses b ON u1.user_id=b.user_id
    WHERE u.user_id=?`, [ user_id ],
    res => {
      if( !res.result.length ) return onSuccess();
      var r = res.result[0];

      if( r.user_rate !== null ){
        var binary_cycles = calcStats(r, amount);

        var args = [ r, amount, level, binary_cycles ];
        linear( ...args );
        binary( ...args );
        match( ...args );
        lead( ...args );
        start( ...args );
        extra( ...args );
      }

      calc(r.user_id, amount, onSuccess, onError, level + 1);
    }, onError);
}

module.exports = calc;
