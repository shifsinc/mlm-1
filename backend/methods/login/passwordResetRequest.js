const { makeQuery, sendMail  } = require('../../utils.js');
const { INCORRECT_QUERY, OK, emailRegexp, USER_NOT_EXISTS } = require('../../const.js');
const { DOMAIN } = require('../../config.js');
const hash = require('js-sha1');
const { sendResetMail } = require('../../email.js');

module.exports = function(callback, params){/*email*/
  var email = params.email;
  if( email === undefined || !emailRegexp.test(email) ) return callback( INCORRECT_QUERY );

  makeQuery(`SELECT user_id FROM users WHERE user_email=?`, [ email ], res => {
    if( !res.result.length ) return callback( USER_NOT_EXISTS );
    var user_id = res.result[0].user_id;

    var resetToken = hash( Math.random() + '' );
    makeQuery(`UPDATE users SET password_reset_token=?, password_reset_token_ts=now() WHERE user_id=?`, [ resetToken, user_id ],
    res => {

      sendResetMail(email, resetToken, (err, info) => {
        var res = OK;
        res.action.text = 'Письмо отправлено';
        callback( res );
      });

    }, callback);

  });
}
