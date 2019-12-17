const { makeQuery } = require('../utils.js');
const { INCORRECT_QUERY, AUTH_FAILED, FORBIDDEN,
    nameRegexp, phoneRegexp, linkRegexp, telegramRegexp, passwordRegexp } = require('../const.js');

module.exports = function(callback, params, _user_id){/*name, surname, phone, social_link, telegram*/
  var name = params.name, surname = params.surname, phone = params.phone, social = params.social_link, telegram = params.telegram;
  if( name === undefined || !nameRegexp.test(name) ||
    surname === undefined || !nameRegexp.test(surname) ||
    phone === undefined || !phoneRegexp.test(phone) ||
    social === undefined || !linkRegexp.test(social) ||
    telegram === undefined || !telegramRegexp.test(telegram))
    return callback( INCORRECT_QUERY );

    makeQuery(`SELECT user_data_filled FROM users WHERE user_id=?`, [ _user_id ],
      res => {
        if( res.result[0].user_data_filled ) return callback( FORBIDDEN );

        makeQuery(`UPDATE users SET
            user_name=?,
            user_surname=?,
            user_phone=?,
            user_social=?,
            user_telegram=?,
            user_data_filled=true
            WHERE user_id=?`,
          [ name, surname, phone, social, telegram, _user_id ],
          res => {
            callback({ status: 'ok', action: { path: '/account' } });
          }, callback);

      }, callback);

}
