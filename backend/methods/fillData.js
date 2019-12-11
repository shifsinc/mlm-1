const { makeQuery } = require('../utils.js');
const { INCORRECT_QUERY, nameRegexp, phoneRegexp, linkRegexp, telegramRegexp } = require('../const.js');

module.exports = function(callback, params, _user_id){/*name, lastname, phone, social_link, telegram*/
  var name = params.name, lastname = params.lastname, phone = params.phone,
    social_link = params.social_link, telegram = params.telegram;
  if( name === undefined || !nameRegexp.test(name) ||
      lastname === undefined || !nameRegexp.test(lastname) ||
      phone === undefined || !phoneRegexp.test(phone) ||
      social_link === undefined || !linkRegexp.test(social_link) ||
      telegram === undefined || !telegramRegexp.test(telegram) )
    return callback( INCORRECT_QUERY );

  makeQuery(`SELECT user_data_filled FROM users WHERE user_id=?`, [ _user_id ],
    res => {
    if( res.result[0].user_data_filled ) return callback({ status: 'error', text: 'data already filled' });

    makeQuery(`UPDATE users SET
      user_data_filled=true,
      user_name=?,
      user_surname=?,
      user_phone=?,
      user_social=?,
      user_telegram=?
      WHERE user_id=?`,
    [ name, lastname, phone, social_link, telegram, _user_id ],
    res => {
    callback({ status: 'ok', action: { path: '/account' } });
    }, callback);

  }, callback);
}
