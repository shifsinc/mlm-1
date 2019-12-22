const { makeQuery } = require('../utils.js');
const { INCORRECT_QUERY, AUTH_FAILED, nameRegexp, phoneRegexp, linkRegexp, telegramRegexp, passwordRegexp } = require('../const.js');

module.exports = function(callback, params, _user_id){/*name, surname, phone, social_link, telegram, new_password, current_password*/
  var pwd = params.current_password;
  if( pwd === undefined || !passwordRegexp.test(pwd) ) return callback( INCORRECT_QUERY );
  makeQuery(`SELECT user_id FROM users WHERE user_id=? AND user_password_hash=md5(?)`, [ _user_id, pwd ],
    res => {
      if( !res.result.length ){
        res = AUTH_FAILED;
        res.action.text = 'Пароль введен неверно';
        return callback( res );
      }

    var upd = {};
    if( params.name !== undefined && nameRegexp.test(params.name) ) upd.user_name = params.name;
    if( params.surname !== undefined && nameRegexp.test(params.surname) ) upd.user_surname = params.surname;
    if( params.phone !== undefined && phoneRegexp.test(params.phone) ) upd.user_phone = params.phone;
    if( params.social_link !== undefined && linkRegexp.test(params.social_link) ) upd.user_social = params.social_link;
    if( params.telegram !== undefined && telegramRegexp.test(params.telegram) ) upd.user_telegram = params.telegram;
    if( params.new_password !== undefined && passwordRegexp.test(params.new_password) ) upd.user_password_hash = params.new_password;

    var queryStr = Object.keys(upd).map(k => k + ( k === 'user_password_hash' ? '=md5(?)' : '=?' )).join(',');
    if( !queryStr.length ) return callback( INCORRECT_QUERY );

    makeQuery(`UPDATE users SET ` + queryStr + ` WHERE user_id=?`,
      [ ...Object.values(upd), _user_id ],
      res => {
        callback({ status: 'ok', action: { path: '/account' } });
      }, callback);

    }, callback);

}
