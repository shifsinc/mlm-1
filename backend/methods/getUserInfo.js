const { makeQuery } = require('../utils.js');
const { INCORRECT_QUERY } = require('../const.js');

module.exports = function(callback, params, _user_id){/**/
  makeQuery(`SELECT
    u.user_id,
    u.user_login,
    u.user_name,
    u.user_surname,
    u.user_email,
    u.user_phone,
    u.user_social,
    u.user_telegram,
    u.user_photo,
    u.user_bonus_level,
    u.user_rate,
    u.user_refer,
    u.user_refer_type,
    _u.user_name AS user_refer_name,
    _u.user_surname AS user_refer_surname

    FROM users u JOIN users _u ON u.user_refer=_u.user_id WHERE u.user_id=?`, [ _user_id ],
    res => {
      res.result = res.result[0];
      callback(res);
  }, callback);
}
