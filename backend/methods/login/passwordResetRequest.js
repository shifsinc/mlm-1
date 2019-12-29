const { makeQuery } = require('../../utils.js');
const { INCORRECT_QUERY, OK, emailRegexp } = require('../../const.js');

module.exports = function(callback, params){/*email*/
  var email = params.email;
  if( email === undefined || !emailRegexp.test(email) ) return callback( INCORRECT_QUERY );

  makeQuery(`UPDATE users SET password_reset_token=md5(rand()), password_reset_token_ts=now() WHERE user_email=?`, [ email ],
  res => {
    //send email with password_reset_token
    var res = OK;
    res.action.text = 'Письмо отправлено';
    callback( res );
  }, callback);
}
