const { makeQuery } = require('../../utils.js');
const { OK } = require('../../const.js');

module.exports = function(callback, params, _user_id){/**/
  makeQuery(`SELECT
    (SELECT COUNT(*) FROM users) AS users_total,
    (SELECT SUM(account_withdraws) FROM accounts) AS withdraws_sum,
    (SELECT COUNT(*) FROM users WHERE user_rate_first=1) AS users_rate_first`, [],
    stats1 => {
      makeQuery(`SELECT COUNT(*) AS count  FROM users GROUP BY user_rate`, [], stats2 => {
        var rate_stats = stats2.result.map(r => r.count), stats = Object.assign({}, stats1.result[0], { rate_stats });
        var resp = Object.assign({}, OK, { result: stats });
        callback(resp);
      }, callback);
  }, callback);
}
