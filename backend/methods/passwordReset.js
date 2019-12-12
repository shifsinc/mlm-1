const { makeQuery } = require('../utils.js');
const { INCORRECT_QUERY, OK, INCORRECT_TOKEN, PASSWORD_RESET_TOKEN_VALID_TIME, passwordRegexp, tokenRegexp } = require('../const.js');

module.exports = function(callback, params){/*resetToken, password*/
  var resetToken = params.resetToken, password = params.password;
  if( resetToken === undefined || !tokenRegexp.test(resetToken) ||
    password === undefined || !passwordRegexp.test(password) )
    return callback( INCORRECT_QUERY );

  makeQuery(`SELECT password_reset_token_ts FROM users WHERE password_reset_token=?`, [ resetToken ],
  res => {
    if( !res.result.length ) return callback( INCORRECT_TOKEN );

    var tokenDate = new Date( res.result[0].password_reset_token_ts ), nowDate = new Date();
    if( ( nowDate.valueOf() - tokenDate.valueOf() ) > PASSWORD_RESET_TOKEN_VALID_TIME ){
      makeQuery(`UPDATE users SET
        password_reset_token=null,password_reset_token_ts=null
        WHERE password_reset_token=?`, [ resetToken ]);
      return callback( INCORRECT_TOKEN );
    }

    makeQuery(`UPDATE users SET
      user_password_hash=md5(?),
      password_reset_token=null,
      password_reset_token_ts=null
    WHERE password_reset_token=?`, [ password, resetToken ],
    res => {
      var res = OK;
      res.action.path = '/signin';
      callback( res );
    }, callback);

  }, callback);

}
