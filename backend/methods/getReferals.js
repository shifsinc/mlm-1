const { makeQuery } = require('../utils.js');
const { INCORRECT_QUERY } = require('../const.js');
const { PHOTOS_PREFIX } = require('../config.js');

module.exports = function(callback, params, _user_id){/*count*/
  var count = params.count;
  if( isNaN(count) || count < 1 || count > 20 ) return callback( INCORRECT_QUERY );

  makeQuery(`SELECT
    user_id,
    user_name,
    user_surname,
    user_photo
    FROM users WHERE user_refer=? ORDER BY user_dt LIMIT ?`, [ _user_id, count ],
    res => {
      res.result.forEach(r => r.user_photo_url = PHOTOS_PREFIX + r.user_photo);
      callback(res);
  }, callback);
}
