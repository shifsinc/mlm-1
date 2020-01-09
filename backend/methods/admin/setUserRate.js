const { makeQuery, checkUserPwd } = require('../../utils.js');
const { INCORRECT_QUERY, OK } = require('../../const.js');

module.exports = function(callback, params, _user_id){/*user_id, rate, current_password*/
  var user_id = parseInt( params.user_id ), rate = parseInt( params.rate ), pwd = params.current_password;
  if( isNaN(user_id) || isNaN(rate) || rate < 1 || rate > 4 ) return callback( INCORRECT_QUERY );

  checkUserPwd(_user_id, pwd, () => {

    makeQuery(`UPDATE users SET user_rate=? WHERE user_id=?`, [ rate, user_id ], res => {
      callback( OK );
    }, callback);

  }, callback);
}
