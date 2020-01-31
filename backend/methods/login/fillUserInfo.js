const { makeQuery } = require('../../utils.js');
const { INCORRECT_QUERY, OK, FORBIDDEN, DATA_NOT_UNIQUE,
    nameRegexp, phoneRegexp, socialRegexp, telegramRegexp, filenameRegexp } = require('../../const.js');
const { PHOTOS_PATH } = require('../../config.js');

const { existsSync } = require('fs');
const readChunk = require('read-chunk');
const fileType = require('file-type');

const NO_PHOTO_LOADED = { status: 'error', action: { text: 'Пожалуйста, выберите фото' } }

module.exports = function(callback, params, _user_id){/*name, surname, phone, social, telegram, photo*/
  var name = params.name, surname = params.surname,
    phone = params.phone, social = params.social, telegram = params.telegram, photo = params.photo;
  if( name === undefined || !nameRegexp.test(name) ||
    surname === undefined || !nameRegexp.test(surname) ||
    phone === undefined || !phoneRegexp.test(phone) )
    return callback( INCORRECT_QUERY );

  if( telegram === undefined || !telegramRegexp.test(telegram) ) telegram = null;
  if( social === undefined || !socialRegexp.test(social) ) social = null;

  var filepath = PHOTOS_PATH + photo;
  if( photo === undefined || !filenameRegexp.test(photo) || !existsSync( filepath ) ) return callback( NO_PHOTO_LOADED );
  var buf = readChunk.sync(filepath, 0, fileType.minimumBytes);
  filetype = fileType( buf );
  if( !filetype || !filetype.mime.startsWith('image') ) return callback( NO_PHOTO_LOADED );

  makeQuery(`SELECT user_data_filled FROM users WHERE user_id=?`, [ _user_id ],
    res => {
      if( res.result[0].user_data_filled ) return callback( FORBIDDEN );

      makeQuery(`UPDATE users SET
          user_name=?,
          user_surname=?,
          user_phone=?,
          user_social=?,
          user_telegram=?,
          user_photo=?,
          user_data_filled=1
          WHERE user_id=?`,
        [ name, surname, phone, social, telegram, photo,  _user_id ],
        res => {
          var resp = Object.assign({}, OK, { action: { path: '/account' } });
          callback(resp);
        }, () => {
          callback( DATA_NOT_UNIQUE );
        });

    }, callback);

}
