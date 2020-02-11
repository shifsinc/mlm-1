const { makeQuery, checkUserPwd } = require('../../utils.js');
const { INCORRECT_QUERY, OK, ROBOT_LICENSE_VALID, USER_NOT_EXISTS } = require('../../const.js');

module.exports = function(callback, params, _user_id){/*user_id, rate, current_password*/
  var user_id = parseInt( params.user_id ), rate = parseInt( params.rate ), pwd = params.current_password;
  if( isNaN(user_id) || isNaN(rate) || rate < 1 || rate > 4 ) return callback( INCORRECT_QUERY );

  checkUserPwd(_user_id, pwd, () => {

    makeQuery(`SELECT user_license_valid_dt FROM users WHERE user_id=?`, [ user_id ], res => {
      if( !res.result.length ) return callback( USER_NOT_EXISTS );
      var dt = res.result[0].user_license_valid_dt;

      var license_upd = '';
      if( dt === null ) license_upd = `,user_license_valid_dt=DATE_ADD(current_timestamp, INTERVAL ${ROBOT_LICENSE_VALID} MONTH)`;

      makeQuery(`UPDATE users SET
        user_rate=? ${license_upd}
        WHERE user_id=?`, [ rate, user_id ], res => {
        callback( OK );
      }, callback);

    })

  }, callback);
}
