const { makeQuery, checkCaptcha } = require('../../utils.js');
const { INCORRECT_QUERY, OK, emailRegexp, USER_NOT_EXISTS,
  PASSWORD_RESET_TIMEOUT, FORBIDDEN, INCORRECT_CAPTCHA } = require('../../const.js');
const { DOMAIN } = require('../../config.js');
const hash = require('js-sha1');
const { sendResetMail } = require('../../email.js');

module.exports = function(callback, params){
  checkCaptcha(params['g-recaptcha-response'], 2, () => reset(callback, params), () => callback( INCORRECT_CAPTCHA ));
}

function reset(callback, params){/*email*/
  var email = params.email;
  if( email === undefined || !emailRegexp.test(email) ) return callback( INCORRECT_QUERY );

  makeQuery(`SELECT user_id, password_reset_token_ts FROM users WHERE user_email=?`, [ email ], res => {
    if( !res.result.length ) return callback( USER_NOT_EXISTS );
    var user_id = res.result[0].user_id, lastReset = new Date( res.result[0].password_reset_token_ts );

    if( new Date() - lastReset < PASSWORD_RESET_TIMEOUT )
      return callback( Object.assign({}, FORBIDDEN, { action: { text: 'Сброс пароля недоступен' } }) );

    var resetToken = hash( Math.random() + '' );
    makeQuery(`UPDATE users SET password_reset_token=?, password_reset_token_ts=NOW() WHERE user_id=?`,
      [ resetToken, user_id ],
      res => {

        sendResetMail(email, resetToken, (err, info) => {
          var resp = Object.assign({}, OK, { action: { text: 'Письмо отправлено' } });
          callback(resp);
        });

      }, callback);

  });
}
