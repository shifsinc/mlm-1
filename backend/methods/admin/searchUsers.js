const { makeQuery } = require('../../utils.js');
const { INCORRECT_QUERY, PHOTOS_PREFIX } = require('../../const.js');

module.exports = function(callback, params, _user_id){/*pattern, offset, count*/
  var count = parseInt( params.count ), offset = parseInt( params.offset ), pattern = params.pattern ? params.pattern + '%' : '%';
  if( isNaN(offset)  || isNaN(count) || count < 1 || count > 50 ) return callback( INCORRECT_QUERY );

  makeQuery(`SELECT
    u.user_id,
    u.user_name,
    u.user_surname,
    u.user_rate+0 AS user_rate,
    u.user_dt,
    s.stats_left_referals,
    s.stats_right_referals
    FROM users u
    JOIN users_stats s ON u.user_id=s.user_id
    WHERE u.user_login LIKE ?
    ORDER BY u.user_id DESC
    LIMIT ?,?`, [ pattern, offset, count ],
    res => {

      makeQuery(`SELECT COUNT(*) AS count FROM users WHERE user_login LIKE ?`, [ pattern ], count => {
        res.result.forEach(r => r.user_photo_url = PHOTOS_PREFIX + r.user_photo);
        var resp = Object.assign({}, res, { result: {
          count: count.result[0].count,
          data: res.result
        } });
        callback(resp);
      }, callback);

  }, callback);
}
