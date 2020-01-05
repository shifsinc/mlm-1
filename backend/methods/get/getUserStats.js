const { makeQuery } = require('../../utils.js');
const { INCORRECT_QUERY, USER_NOT_EXISTS } = require('../../const.js');

module.exports = function(callback, params, _user_id){/*user_id*/
  var user_id = parseInt( params.user_id );
  if( isNaN( user_id ) ) user_id = _user_id;

  makeQuery(`SELECT
    stats_first_line_referals,
    stats_second_line_referals,
    stats_first_line_active_referals,
    stats_second_line_active_referals,
    stats_left_referals,
    stats_right_referals,
    stats_yt_left,
    stats_yt_right,
    stats_binary_cycles,
    stats_day_profit
    FROM users_stats
    WHERE user_id=?`, [ user_id ],
    res => {
      if( !res.result.length ) return callback( USER_NOT_EXISTS );
      res.result = res.result[0];
      callback(res);
  }, callback);
}
