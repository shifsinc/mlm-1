const { makeQuery, checkUserPwd } = require('../../utils.js');
const { INCORRECT_QUERY, OK } = require('../../const.js');

module.exports = function(callback, params, _user_id){/*user_id, status, current_password*/
  var user_id = parseInt( params.user_id ), status = params.status, pwd = params.current_password;
  if( isNaN(user_id) || status < 1 || status > 9 )
    return callback( INCORRECT_QUERY );

  checkUserPwd(_user_id, pwd, () => {

    makeQuery(`UPDATE users SET user_status=?, user_admin_set_status=? WHERE user_id=?`, [ status, status, user_id ], res => {
      callback( OK );
    }, callback);

  }, callback);

}
