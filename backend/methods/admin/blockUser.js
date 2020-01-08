const { makeQuery } = require('../../utils.js');
const { INCORRECT_QUERY, OK } = require('../../const.js');

module.exports = function(callback, params, _user_id){/*user_id, block*/
  var user_id = parseInt( params.user_id ), block = params.block;
  if( isNaN(user_id) || block === undefined || user_id === _user_id ) return callback( INCORRECT_QUERY );

  makeQuery(`UPDATE users SET user_blocked=? WHERE user_id=?`, [ block ? 1 : 0, user_id ],
    res => {
      makeQuery(`DELETE FROM sessions WHERE user_id=?`, [ user_id ]);
      res = OK;
      res.result = { user_blocked: block };
      callback( res );
    }, callback);
}
