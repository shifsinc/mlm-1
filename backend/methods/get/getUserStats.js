const { makeQuery } = require('../../utils.js');
const { INCORRECT_QUERY, USER_NOT_EXISTS } = require('../../const.js');

module.exports = function(callback, params, _user_id){/*user_id*/
  var user_id = params.user_id;
  if( user_id === undefined || isNaN( user_id ) ) user_id = _user_id;

  makeQuery(`SELECT
    stats_first_line_referals,
    stats_second_line_referals,
    stats_first_line_active_referals,
    stats_second_line_active_referals,
    stats_left_referals,
    stats_right_referals,
    stats_yt_left,
    stats_yt_right,
    stats_yt_total,
    stats_binary_cycles_left,
    stats_binary_cycles_right,
    stats_day_profit
    FROM stats
    WHERE user_id=?`, [ user_id ],
    res => {
      if( !res.result.length ) return callback( USER_NOT_EXISTS );
      res.result = res.result[0];
      callback(res);
  }, callback);
}
