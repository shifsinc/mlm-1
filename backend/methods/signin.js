const { makeQuery } = require('../utils.js');
const { INCORRECT_QUERY, AUTH_FAILED } = require('../const.js');

module.exports = function(callback, params){/*login, password*/
  var login = params.login, password = params.password;
  if( login === undefined || password === undefined ) return callback( INCORRECT_QUERY );

  makeQuery(`SELECT user_id, md5(rand()) as token FROM users
    WHERE user_login=? AND user_password_hash=md5(?)`, [ login, password ],
  res => {
    if(res.status == 'error') return callback(res);
    if( res.result.length === 1 ){
      res.result = res.result[0];
      res.path = '/account';
      //makeQuery(`INSERT INTO users_sessions(user_id, token) VALUES(?,?)`, [ res.result.user_id,  res.result.token ]);
    } else {
      res = AUTH_FAILED;
      res.fields = ['login', 'password'];
    }
    callback(res);
  });
}
