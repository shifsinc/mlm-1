const { makeQuery } = require('../utils.js');
const { INCORRECT_QUERY, phoneRegexp, emailRegexp } = require('../const.js');
const { PHOTOS_PREFIX } = require('../config.js');

module.exports = function(callback, params){/*refer_phone, refer_email*/
  var phone = params.refer_phone ? params.refer_phone : '00000000000',
    email = params.refer_email ? params.refer_email : '.@.';
  if( ( phone === undefined || !phoneRegexp.test(phone) ) &&
    ( email === undefined || !emailRegexp.test(email) ) )
    return callback( INCORRECT_QUERY );

  makeQuery(`SELECT user_email, user_phone, user_photo FROM users
    WHERE user_phone=? OR user_email=?`, [ phone, email ],
    res => {
      if( !res.result.length ) return callback({ status: 'error', text: 'user doesn\'t exist', result: {} });
      res.result = res.result[0];
      res.result.user_photo_url = PHOTOS_PREFIX + res.result.user_photo;
      callback(res);
  }, callback);
}
