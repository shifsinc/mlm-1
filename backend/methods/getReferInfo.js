const { makeQuery } = require('../utils.js');

module.exports = function(callback, params){

  makeQuery(`SELECT user_email FROM users
    WHERE user_phone=?`, [ params.code ],
    res => {
      if(res.status == 'error') return callback(res);
      if( !res.result.length ) return callback({ status: 'error', text: 'refer doesn\'t exist' });
      callback({ status: 'ok', result: { email: res.result[0].user_email, photoUrl: '' } });
  });
}
