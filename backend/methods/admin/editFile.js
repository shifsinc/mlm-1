const { makeQuery } = require('../../utils.js');
const { INCORRECT_QUERY, OK, FILE_NOT_EXISTS } = require('../../const.js');
const { FILES_PATH } = require('../../config.js');

module.exports = function(callback, params, _user_id){/*title, descr, rate, file_id*/
  var title = params.title ? params.title : null, descr = params.descr ? params.descr : null,
    rate = parseInt( params.rate ), file_id = parseInt( params.file_id );
  if( isNaN(rate) || rate === 0 ) rate = null;
  if( (rate !== null && ( rate < 1 || rate > 4 )) || isNaN(file_id) ) return callback( INCORRECT_QUERY );

  makeQuery(`UPDATE files SET file_title=?, file_descr=?, file_rate=? WHERE file_id=?`, [ title, descr, rate, file_id ],
    res => {
      callback( OK );
    } , callback);
}
