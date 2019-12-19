const { makeQuery } = require('../utils.js');
const { INCORRECT_QUERY } = require('../const.js');

module.exports = function(callback, params, _user_id){/*count, user_id*/
  var count = params.count, user_id = params.user_id;
  if( user_id === undefined ) user_id = _user_id;
  if( isNaN(count) || count < 1 || count > 20 || isNaN(user_id) ) return callback( INCORRECT_QUERY );

  makeQuery(`SELECT
    user_id,
    user_name,
    user_surname,
    user_photo
    FROM users WHERE user_refer=? ORDER BY user_dt DESC LIMIT ?`, [ _user_id, count ],
    res => {
      callback(res);
  }, callback);
}
