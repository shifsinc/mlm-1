const { makeQuery } = require('../../utils.js');
const { INCORRECT_QUERY } = require('../../const.js');

module.exports = function(callback, params, _user_id){/*user_id*/
  var user_id = params.user_id;
  if( user_id === undefined || isNaN( user_id ) ) user_id = _user_id;

  makeQuery(`SELECT
    bonus_binary,
    bonus_match,
    bonus_yoda,
    bonus_linear1,
    bonus_linear2,
    bonus_lead
    FROM user_bonuses WHERE user_id=?`, [ user_id ],
      res => {
        res.result = res.result[0];
        callback(res);
      }, callback);
}
