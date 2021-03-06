const { makeQuery } = require('../../utils.js');
const { OK, INCORRECT_FILE } = require('../../const.js');
const { PHOTOS_PATH } = require('../../config.js');
const hash = require('js-sha1');
const { writeFile } = require('fs');

const fileType = require('file-type');

module.exports = function(callback, params, _user_id){/*_file*/
  var file = params._file, filetype = fileType( file );
  if( !filetype || !filetype.mime || !filetype.mime.startsWith('image') ) return callback( INCORRECT_FILE );

  var filename = hash( file.slice(8192) );
  writeFile( PHOTOS_PATH + filename, file, e => {
     if(e) return callback( INTERNAL_ERROR );
     
    var resp = Object.assign({}, OK, { result: { filename } });
    callback(resp);
  });
}
