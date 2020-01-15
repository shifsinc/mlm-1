const { makeQuery } = require('../../utils.js');
const { INCORRECT_QUERY, INCORRECT_FILE } = require('../../const.js');
const { PHOTOS_PATH } = require('../../config.js');
const hash = require('js-sha1');
const { writeFile } = require('fs');

const fileType = require('file-type');

module.exports = function(callback, params, _user_id){/*_file*/
  var file = params._file, filetype = fileType( file );
  if( !filetype || !filetype.mime.startsWith('image') ) return callback( INCORRECT_FILE );

  var filename = hash( file )
  writeFile( PHOTOS_PATH + filename, file, e => {
    callback({ status: 'ok', result: { filename } });
  });
}
