const { makeQuery } = require('../../utils.js');
const { INCORRECT_QUERY, FORBIDDEN, DATA_NOT_UNIQUE, NO_PHOTO,
    nameRegexp, phoneRegexp, linkRegexp, telegramRegexp, filenameRegexp } = require('../../const.js');
const { PHOTOS_PATH } = require('../../config.js');

const { existsSync } = require('fs');
const readChunk = require('read-chunk');
const fileType = require('file-type');

module.exports = function(callback, params, _user_id){/*name, surname, phone, social_link, telegram, photo*/
  var name = params.name, surname = params.surname,
    phone = params.phone, social = params.social_link, telegram = params.telegram, photo = params.photo;
  if( name === undefined || !nameRegexp.test(name) ||
    surname === undefined || !nameRegexp.test(surname) ||
    phone === undefined || !phoneRegexp.test(phone) ||
    social === undefined || !linkRegexp.test(social) ||
    telegram === undefined || !telegramRegexp.test(telegram))
    return callback( INCORRECT_QUERY );

  if( photo !== undefined && filenameRegexp.test(photo) ){
    var filepath = PHOTOS_PATH + photo;
    if( existsSync( filepath ) ){
      var buf = readChunk.sync(filepath, 0, fileType.minimumBytes);
      filetype = fileType( buf );
      if( !filetype || !filetype.mime.startsWith('image') ) photo = NO_PHOTO;
    } else photo = NO_PHOTO;
  } else photo = NO_PHOTO;

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
            callback({ status: 'ok', action: { path: '/account' } });
          }, () => {
            callback( DATA_NOT_UNIQUE );
          });

      }, callback);

}
