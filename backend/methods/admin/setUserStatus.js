const { makeQuery, checkUserPwd } = require('../../utils.js');
const { INCORRECT_QUERY, OK } = require('../../const.js');

module.exports = function(callback, params, _user_id){/*user_id, status, current_password*/
  var user_id = parseInt( params.user_id ), status = params.status, pwd = params.current_password;
  if( isNaN(user_id) ||
    !( /^(investor|bronze|silver|gold|platinum|sapphire|emerald|diamond|diamond2)$/.test(status) ) )
    return callback( INCORRECT_QUERY );

  checkUserPwd(_user_id, pwd, () => {

    makeQuery(`UPDATE users SET user_status=? WHERE user_id=?`, [ status, user_id ], res => {
      callback( OK );
    }, callback);
    
  }, callback);

}
