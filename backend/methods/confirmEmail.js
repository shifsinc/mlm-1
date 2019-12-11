const { makeQuery, validateUser } = require('../utils.js');
const { INCORRECT_QUERY, OK, tokenRegexp } = require('../const.js');

module.exports = function(callback, params){/*confirmToken*/
  var confirmToken = params.confirmToken;
  if( confirmToken === undefined || !tokenRegexp.test(confirmToken) ) return callback( INCORRECT_QUERY );

  makeQuery(`UPDATE users SET email_confirm_token=null WHERE email_confirm_token=?`, [ confirmToken ],
    res => {
      if( params.token ){
        makeQuery(`SELECT user_id FROM users_sessions WHERE token=?`, [ params.token ],
        res => {
          if( !res.result.length ) return callback({ status: 'ok', action: { path: '/signin' } });

          validateUser(res.result[0].user_id,
            () => callback({ status: 'ok', action: { path: '/account' } }),
            callback,
            callback
          );

        }, callback);
      } else callback({ status: 'ok', action: { path: '/signin' } });
  }, callback);
}
