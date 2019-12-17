const { makeQuery } = require('../utils.js');
const { INCORRECT_QUERY } = require('../const.js');

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
      callback(res);
  }, callback);
}
