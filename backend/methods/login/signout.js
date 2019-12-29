const { makeQuery } = require('../../utils.js');
const { INCORRECT_QUERY, OK, tokenRegexp } = require('../../const.js');

module.exports = function(callback, params, _user_id){/*token*/
  var token = params.token;
  if( token === undefined || !tokenRegexp.test(token) ) return callback( INCORRECT_QUERY );

  makeQuery(`DELETE FROM sessions WHERE user_id=? AND token=?`, [ _user_id, token ],
    res => {
    callback( OK );
  }, callback);
}
