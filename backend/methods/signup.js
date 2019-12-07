const { makeQuery } = require('../utils.js');

module.exports = function(callback, params){/*login, password, email, refer, mode*/
  var login = params.login, password = params.password, email = params.email, refer = params.refer, mode = params.mode;
  if( login === undefined || password === undefined || email === undefined || refer === undefined || mode === undefined )
    return callback( INCORRECT_QUERY );

  //refer exists? user already exists?

  makeQuery(`INSERT INTO users(user_login, user_password_hash, user_name, user_surname, user_status, user_email, account_id)
  VALUES(?,md5(?),?,?,?,?,?)`, [ login, password, 'name', 'surname', 1, email, 1 ],
    res => {
      if(res.status == 'error') return callback(res);
      res.path = '/signin';
      callback({ status: 'ok', path: '/signin' });
    });
}
