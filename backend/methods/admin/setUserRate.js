const { makeQuery } = require('../../utils.js');
const { INCORRECT_QUERY, OK } = require('../../const.js');

module.exports = function(callback, params, _user_id){/*user_id, rate*/
  var user_id = parseInt( params.user_id ), rate = parseInt( params.rate );
  if( isNaN(user_id) || isNaN(rate) || rate < 1 || rate > 4 ) return callback( INCORRECT_QUERY );

  makeQuery(`UPDATE users SET user_rate=? WHERE user_id=?`, [ rate, user_id ], res => {
    callback( OK );
  }, callback);
}
