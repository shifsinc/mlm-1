const { makeQuery, validateUser } = require('../../utils.js');
const { INCORRECT_QUERY, AUTH_FAILED, ADMIN_ROLE } = require('../../const.js');

module.exports = function(callback, params){/*login, password*/
  var login = params.login, password = params.password;
  if( login === undefined || password === undefined ) return callback( INCORRECT_QUERY );

  makeQuery(`SELECT user_id, role_id, SHA(rand()) as token FROM users
    WHERE (user_login=? OR user_email=?) AND user_password_hash=SHA(?)`, [ login, login, password ],
  res => {
    if( res.result.length === 1 ){
      res.result = res.result[0];
      makeQuery(`INSERT INTO sessions(user_id, token) VALUES(?,?)`, [ res.result.user_id,  res.result.token ]);

      validateUser(res.result.user_id, () => {
        res.action = { path: '/account' };
        if( res.result.role_id === ADMIN_ROLE ) res.result.admin = true;
        delete res.result.role_id;
        callback(res);
      }, err => {
        err.result = res.result;
        callback(err);
      }, err => callback(err));

    } else {
      res = AUTH_FAILED;
      res.action.text = 'Логин или пароль введены неправильно!';
      res.action.fields = ['login', 'password'];
      callback(res);
    }
  }, callback);
}
