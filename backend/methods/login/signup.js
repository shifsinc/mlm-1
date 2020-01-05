const { makeQuery, beginTransaction } = require('../../utils.js');
const { INCORRECT_QUERY, OK, loginRegexp, passwordRegexp, emailRegexp, phoneRegexp } = require('../../const.js');

module.exports = function(callback, params){/*login, password, email, refer_phone, refer_type*/
  var login = params.login, password = params.password, email = params.email,
    refer = params.refer_phone, refer_type = params.refer_type;
  if( login === undefined || !loginRegexp.test(login) ||
      password === undefined || !passwordRegexp.test(password) ||
      email === undefined || !emailRegexp.test(email) )
    return callback( INCORRECT_QUERY );

  if( refer === undefined || !phoneRegexp.test(refer) ) refer = '*';

  makeQuery(`SELECT user_id FROM users WHERE user_login=? OR user_email=?`, [ login, email ],
    res => {
      if( res.result.length )
        return callback({ status: 'error', text: 'user already exists', action: { text: 'Пользователь уже существует' } });

      makeQuery(`SELECT user_id, general_link_type FROM users WHERE user_phone=?`, [ refer ],
        res => {

          var query, values, refer_id = null;
          if(!res.result.length){
            query = `INSERT INTO users(user_login, user_password_hash, user_email, email_confirm_token)
              VALUES(?,md5(?),?,md5(rand()))`;
            values = [ login, password, email ];
            refer_type = null;
          } else {
            query = `INSERT INTO users(user_login, user_password_hash, user_email, user_refer, user_refer_type, email_confirm_token)
              VALUES(?,md5(?),?,?,?,md5(rand()))`;
            refer_type = ( refer_type !== undefined && /^[lr]$/.test(refer_type) ) ? refer_type : res.result[0].general_link_type;
            refer_id = res.result[0].user_id;
            values = [ login, password, email, res.result[0].user_id, refer_type ];
          }

          makeQuery(query, values,
            res => {
              //send email with email_confirm_token
              res = OK;
              res.action = { path: '/signin' };
              callback(res);
            }, callback);

      }, callback);

    }, callback);
}
