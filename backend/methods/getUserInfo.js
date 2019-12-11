const { makeQuery } = require('../utils.js');
const { INCORRECT_QUERY } = require('../const.js');

module.exports = function(callback, params, _user_id){/**/
  makeQuery(`SELECT
    user_login,
    user_name,
    user_surname,
    user_refer,
    user_email,
    user_phone,
    user_social,
    user_telegram,
    user_photo,
    user_bonus_level,
    user_rate,
    user_refer_type
    FROM users WHERE user_id=?`, [ _user_id ],
    res => {
      res.result = res.result[0];
      callback(res);
  }, callback);
}
