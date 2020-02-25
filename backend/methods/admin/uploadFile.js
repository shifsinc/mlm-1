const { makeQuery } = require('../../utils.js');
const { INCORRECT_QUERY, OK, INTERNAL_ERROR, filenameRegexp } = require('../../const.js');
const { FILES_PATH } = require('../../config.js');
const { writeFile } = require('fs');

module.exports = function(callback, params, _user_id){/*_file, filename*/
  var file = params._file, filename = params.filename;
  if( file === undefined || filename === undefined || !filenameRegexp.test(filename) ) return callback( INCORRECT_QUERY );

  writeFile( FILES_PATH + filename, file, e => {
    if(e) callback( INTERNAL_ERROR );
    else callback( Object.assign({}, OK, { result: { filename } }) );
  });
}
