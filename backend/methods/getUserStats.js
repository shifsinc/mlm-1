const { makeQuery } = require('../utils.js');
const { INCORRECT_QUERY } = require('../const.js');

module.exports = function(callback, params, _user_id){/*user_id*/
  var user_id = params.user_id;
  if( user_id === undefined ) user_id = _user_id;
  if( isNaN(user_id) ) return callback( INCORRECT_QUERY );

  makeQuery(`SELECT `, [ user_id ],
    res => {
      callback(res);
  }, callback);
}
