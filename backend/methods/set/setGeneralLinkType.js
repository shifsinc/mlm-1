const { makeQuery } = require('../../utils.js');
const { INCORRECT_QUERY, OK } = require('../../const.js');

module.exports = function(callback, params, _user_id){/*type*/
  var type = params.type;
  if( type !== 'l' && type !== 'r' ) return callback( INCORRECT_QUERY );

  makeQuery(`UPDATE users SET general_link_type=? WHERE user_id=?`, [ type, _user_id ],
    res => {
      callback( OK );
    }, callback);
}
