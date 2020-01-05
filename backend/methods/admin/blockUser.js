const { makeQuery } = require('../../utils.js');
const { INCORRECT_QUERY, OK } = require('../../const.js');

module.exports = function(callback, params, _user_id){/*user_id, block*/
  var user_id = parseInt( params.user_id ), block = parseInt( params.block );
  if( isNaN(user_id) || isNaN(block) || block < 0 || block > 1 ) return callback( INCORRECT_QUERY );

  makeQuery(`UPDATE users SET user_blocked=? WHERE user_id=?`, [ block, user_id ],
    res => {
      callback( OK );
    }, callback);
}
