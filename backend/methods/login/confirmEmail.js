const { makeQuery, validateUser } = require('../../utils.js');
const { INCORRECT_QUERY, tokenRegexp } = require('../../const.js');

module.exports = function(callback, params){/*confirmToken*/
  var confirmToken = params.confirmToken;
  if( confirmToken === undefined || !tokenRegexp.test(confirmToken) ) return callback( INCORRECT_QUERY );

  makeQuery(`UPDATE users SET email_confirm_token=null WHERE email_confirm_token=?`, [ confirmToken ],
    res => {
      if( !params.token ) return callback( Object.assign({}, OK, {  action: { path: '/signin' }}) );
      
      makeQuery(`SELECT user_id FROM sessions WHERE token=?`, [ params.token ],
      res => {
        if( !res.result.length ) return callback( Object.assign({}, OK, {  action: { path: '/signin' }}) );

        validateUser(res.result[0].user_id,
          () => callback( Object.assign({}, OK, {  action: { path: '/account' }}) ),
          callback,
          callback
        );

      }, callback);

  }, callback);
}
