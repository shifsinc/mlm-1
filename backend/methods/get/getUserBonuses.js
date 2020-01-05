const { makeQuery } = require('../../utils.js');
const { INCORRECT_QUERY, USER_NOT_EXISTS } = require('../../const.js');

module.exports = function(callback, params, _user_id){/*user_id*/
  var user_id = parseInt( params.user_id );
  if( isNaN( user_id ) ) user_id = _user_id;

  makeQuery(`SELECT
    bonus_linear,
    bonus_binary,
    bonus_match,
    bonus_lead,
    bonus_extra
    FROM users_bonuses WHERE user_id=?`, [ user_id ],
      res => {
        if( !res.result.length ) return callback( USER_NOT_EXISTS );
        res.result = res.result[0];
        callback(res);
      }, callback);
}
