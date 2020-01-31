const { makeQuery } = require('../../utils.js');
const { INCORRECT_QUERY, OK, INTERNAL_ERROR } = require('../../const.js');
const { FILES_PATH } = require('../../config.js');
const hash = require('js-sha1');
const { writeFile } = require('fs');

module.exports = function(callback, params, _user_id){/*_file, filename*/
  var file = params._file;
  var filename = hash( file.slice(8192) ), filetype,
    ind = params.filename ? params.filename.lastIndexOf('.') : -1;
  if( ind !== -1 ) filetype = params.filename.substr( ind );

  if( filetype ) filename += filetype;
  writeFile( FILES_PATH + filename, file, e => {
    if(e) callback( INTERNAL_ERROR );
    else callback( Object.assign({}, OK, { result: { filename } }) );
  });
}
