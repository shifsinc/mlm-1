const { makeQuery } = require('../utils.js');
const { INCORRECT_QUERY, phoneRegexp, emailRegexp } = require('../const.js');

module.exports = function(callback, params){/*phone, email*/
  var phone = params.user_phone ? params.user_phone : '00000000000',
    email = params.user_email ? params.user_email : '.@.';
  if( ( phone === undefined || !phoneRegexp.test(phone) ) &&
    ( email === undefined || !emailRegexp.test(email) ) )
    return callback( INCORRECT_QUERY );

  makeQuery(`SELECT user_email, user_phone, user_photo FROM users
    WHERE user_phone=? OR user_email=?`, [ phone, email ],
    res => {
      if( !res.result.length ) return callback({ status: 'error', text: 'refer doesn\'t exist' });
      res.result = res.result[0];
      callback(res);
  }, callback);
}
