const { makeQuery } = require('../utils.js');
const { INCORRECT_QUERY } = require('../const.js');

module.exports = function(callback, params, _user_id){/**/
  makeQuery(`SELECT
    referals_count,
    yt_left,
    yt_right,
    binary_cycles,
    day_profit
    FROM stats
    WHERE user_id=?`, [ _user_id ],
    res => {
      res.result = res.result[0];
      callback(res);
  }, callback);
}
