const { makeQuery, checkUserPwd, getUserByCode } = require('../../utils.js');
const { INCORRECT_QUERY, OK, AUTH_FAILED, INCORRECT_FILE, DATA_NOT_UNIQUE,
  nameRegexp, phoneRegexp, socialRegexp, telegramRegexp, passwordRegexp, filenameRegexp } = require('../../const.js');
const { PHOTOS_PATH } = require('../../config.js');

const { existsSync } = require('fs');
const readChunk = require('read-chunk');
const fileType = require('file-type');

module.exports = function(callback, params, _user_id){
  /*name, surname, phone, social, telegram, new_password, current_password, photo*/
  var pwd = params.current_password;
  if( pwd === undefined ) return callback( INCORRECT_QUERY );

  checkUserPwd(_user_id, pwd, () => {

    var upd = {};
    if( params.name !== undefined && nameRegexp.test(params.name) ) upd.user_name = params.name;
    if( params.surname !== undefined && nameRegexp.test(params.surname) ) upd.user_surname = params.surname;
    if( params.phone !== undefined && phoneRegexp.test(params.phone) ) upd.user_phone = params.phone;
    if( params.social !== undefined && socialRegexp.test(params.social) ) upd.user_social = params.social;
    if( params.telegram !== undefined && telegramRegexp.test(params.telegram) ) upd.user_telegram = params.telegram;
    if( params.new_password !== undefined && passwordRegexp.test(params.new_password) ) upd.user_password_hash = params.new_password;
    if( params.photo !== undefined && filenameRegexp.test(params.photo) ){
      var filepath = PHOTOS_PATH + params.photo;
      if( existsSync( filepath ) ){
        var buf = readChunk.sync(filepath, 0, fileType.minimumBytes);
        filetype = fileType( buf );
        if( filetype && filetype.mime.startsWith('image') ) upd.user_photo = params.photo;
      }
    }

    var queryStr = Object.keys(upd).map(k => k + ( k === 'user_password_hash' ? '=SHA(?)' : '=?' )).join(',');
    if( !queryStr.length ) return callback( INCORRECT_QUERY );

    makeQuery(`UPDATE users SET ` + queryStr + ` WHERE user_id=?`,
      [ ...Object.values(upd), _user_id ],
      res => {
        var resp = Object.assign({}, OK, { action: { path: '/account' } });
        callback( resp );
      }, () => {
        callback( DATA_NOT_UNIQUE );
      });

  }, callback);
}
