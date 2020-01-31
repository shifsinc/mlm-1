const { makeQuery } = require('../../utils.js');
const { INCORRECT_QUERY, OK, FILE_NOT_EXISTS, filenameRegexp } = require('../../const.js');
const { FILES_PATH } = require('../../config.js');

const { existsSync } = require('fs');
const readChunk = require('read-chunk');
const fileType = require('file-type');

module.exports = function(callback, params, _user_id){/*section, title, descr, filename, rate*/
  var section = params.section,
    title = params.title ? params.title : null, descr = params.descr ? params.descr : null,
    filename = params.filename ? params.filename : null, rate = parseInt( params.rate );
  if( isNaN(rate) || rate === 0 ) rate = null;
  if( !( /^(marketing|instructions|videos|robot)$/.test(section) ) ||
    filename === undefined || !filenameRegexp.test(filename) ||
    ( rate !== null && ( rate < 1 || rate > 4 ) ) ) return callback( INCORRECT_QUERY );

  var filetype, filepath = FILES_PATH + filename;
  if( section !== 'videos' ){

    if( !existsSync( filepath ) ) return callback( FILE_NOT_EXISTS );
    //var buf = readChunk.sync(filepath, 0, fileType.minimumBytes);
    //file_type = fileType( buf ).ext;
    var ind = filename.indexOf('.');
    if( ind === -1 ) filetype = 'file';
    else {
      filetype = filename.substr( ind + 1 );
      if( !filetype ) filetype = 'file';
    }

  } else filetype = 'youtube';

  makeQuery(`INSERT INTO files(file_author, file_rate, file_section, file_type, file_title, file_descr, file_name)
    VALUES (?,?,?,?,?,?,?)`,
    [ _user_id, rate, section, filetype, title, descr, filename ],
    res => {
      callback( OK );
    } , callback);
}
