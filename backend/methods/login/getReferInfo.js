const { makeQuery } = require('../../utils.js');
const { INCORRECT_QUERY, USER_NOT_EXISTS, emailRegexp, phoneRegexp } = require('../../const.js');
const { PHOTOS_PREFIX } = require('../../config.js');

module.exports = function(callback, params){/*refer*/
  var refer = params.refer;
  if( refer === undefined || ( !emailRegexp.test(refer) && !phoneRegexp.test(refer) ) ) return callback( INCORRECT_QUERY );

  makeQuery(`SELECT user_email, user_phone, user_photo FROM users
    WHERE user_phone=? OR user_email=?`, [ refer, refer ],
    res => {
      if( !res.result.length ) return callback( USER_NOT_EXISTS );
      res.result = res.result[0];
      var resp = res;
      if( resp.result.user_photo ) resp.result.user_photo_url = PHOTOS_PREFIX + resp.result.user_photo;
      callback(resp);
  }, callback);
}
