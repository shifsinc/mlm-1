const { makeQuery, beginTransaction } = require('../../utils.js');
const { INCORRECT_QUERY, OK, loginRegexp, passwordRegexp, emailRegexp, phoneRegexp } = require('../../const.js');

module.exports = function(callback, params){/*login, password, email, refer_phone, refer_type*/
  var login = params.login, password = params.password, email = params.email,
    refer = params.refer_phone ? params.refer_phone : '00000000000', refer_type = params.refer_type ? params.refer_type : 'g';
  if( login === undefined || !loginRegexp.test(login) ||
      password === undefined || !passwordRegexp.test(password) ||
      email === undefined || !emailRegexp.test(email) ||
      !phoneRegexp.test(refer) ||
      !( /^[lrg]$/.test(refer_type) ) )
    return callback( INCORRECT_QUERY );

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
            refer_type = refer_type === 'g' ? res.result[0].general_link_type : refer_type;
            refer_id = res.result[0].user_id;
            values = [ login, password, email, res.result[0].user_id, refer_type ];
          }
          beginTransaction(con => {

            makeQuery(query, values,
              res => {
                //send email with email_confirm_token
                res = OK;
                res.action = {};
                res.action.path = '/signin';

                if(refer_type)
                  _updateCounters(() => con.commit( e => callback(res) ), () => con.rollback( e => callback({ status: 'error' }) ),
                    refer_id, (refer_type === 'l' ? 'left' : 'right'), 'first');
                else con.commit(e => callback(res));
              }, callback);
          }, callback);

      }, callback);

    }, callback);


}

function _updateCounters(onSuccess, onError, user_id, dir, line = 'second'){
  makeQuery(`UPDATE stats SET
    ` + dir + `_referals=` + dir + `_referals+1,
    ` + line + `_line_referals=` + line + `_line_referals+1 WHERE user_id=?`, [ user_id ],
  res => {
    makeQuery(`SELECT user_refer, user_refer_type FROM users WHERE user_id=?`, [ user_id ], res => {
      if( !res.result.length ) return onSuccess();
      _updateCounters(onSuccess, onError,
          res.result[0].user_refer,
          (res.result[0].user_refer_type === 'l' ? 'left' : 'right'));
    }, onError);
  }, onError);
}
