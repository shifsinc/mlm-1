const { makeQuery, checkCaptcha } = require('../../utils.js');
const { INCORRECT_QUERY, OK, USER_NOT_EXISTS, INCORRECT_CAPTCHA,
    loginRegexp, passwordRegexp, emailRegexp, phoneRegexp, } = require('../../const.js');
const { sendConfirmMail } = require('../../email.js');
const hash = require('js-sha1');

module.exports = function(callback, params){
  checkCaptcha(params['g-recaptcha-response'], 2, () => signup(callback, params), () => callback( INCORRECT_CAPTCHA ));
}

function signup(callback, params){/*login, password, email, refer_phone, refer_type*/
  var login = params.login, password = params.password, email = params.email,
    refer = params.refer_phone, refer_type = params.refer_type;
  if( login === undefined || !loginRegexp.test(login) ||
      password === undefined || !passwordRegexp.test(password) ||
      email === undefined || !emailRegexp.test(email) )
    return callback( INCORRECT_QUERY );

  if( refer === undefined || !phoneRegexp.test(refer) )
    return callback({ status: 'error', action: { text: 'Вы не можете зарегестрироваться без рефера' } });
  if( refer_type !== undefined && !/^[lr]$/.test(refer_type) )
    return callback({ status: 'error', action: { text: 'Неверный тип рефера' } });

  makeQuery(`SELECT user_id FROM users WHERE user_login=? OR user_email=?`, [ login, email ],
    res => {
      if( res.result.length )
        return callback({ status: 'error', text: 'user already exists', action: { text: 'Пользователь уже существует' } });

      makeQuery(`SELECT user_id, general_link_type, user_blocked FROM users WHERE user_phone=?`, [ refer ],
        res => {

          var query, values, refer_id = null, confirmToken = hash( Math.random() + '' );
          if( !res.result.length || res.result[0].user_blocked ){
            return callback( USER_NOT_EXISTS );
            /*query = `INSERT INTO users(user_login, user_password_hash, user_email, email_confirm_token)
              VALUES(?,SHA(?),?,?)`;
            values = [ login, password, email, confirmToken ];
            refer_type = null;*/
          } else {
            query = `INSERT INTO users(user_login, user_password_hash, user_email, user_refer, user_refer_type, email_confirm_token)
              VALUES(?,SHA(?),?,?,?,?)`;
            refer_type = ( refer_type === undefined ) ? res.result[0].general_link_type : refer_type;
            refer_id = res.result[0].user_id;
            values = [ login, password, email, res.result[0].user_id, refer_type, confirmToken ];
          }

          makeQuery(query, values,
            res => {

              sendConfirmMail(email, confirmToken, (err, info) => {
                var resp = Object.assign({}, OK, { action: { path: '/signin' } });
                callback(resp);
              });

            }, callback);

      }, callback);

    }, callback);
}
