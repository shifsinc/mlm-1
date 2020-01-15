const { makeQuery } = require('../../utils.js');
const { INCORRECT_QUERY, OK, tokenRegexp, INCORRECT_TOKEN } = require('../../const.js');

module.exports = function(callback, params, _user_id){/*token*/
  var token = params.token;
  if( token === undefined ) return callback( INCORRECT_QUERY );
  if( !tokenRegexp.test(token) ) return callback( INCORRECT_TOKEN );

  makeQuery(`DELETE FROM sessions WHERE user_id=? AND token=?`, [ _user_id, token ],
    res => {
    callback( OK );
  }, callback);
}
