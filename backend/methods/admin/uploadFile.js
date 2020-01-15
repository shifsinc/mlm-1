const { makeQuery } = require('../../utils.js');
const { INCORRECT_QUERY } = require('../../const.js');
const { FILES_PATH } = require('../../config.js');
const hash = require('js-sha1');
const { writeFile } = require('fs');

const fileType = require('file-type');

module.exports = function(callback, params, _user_id){/*_file*/
  var  file = params._file;
  var filename = hash( file ), filetype = fileType( file );
  if( filetype ) filename += '.' + filetype.ext;
  writeFile( FILES_PATH + filename, file, e => {
    callback({ status: 'ok', result: { filename } });
  });
}
