const { makeQuery } = require('../../utils.js');
const { INCORRECT_QUERY, OK } = require('../../const.js');
const { unlink } = require('fs');

module.exports = function(callback, params, _user_id){/*file_id*/
  var file_id = parseInt( params.file_id );
  if( isNaN(file_id) ) return callback( INCORRECT_QUERY );

  makeQuery(`SELECT file_name FROM files WHERE file_id=?`, [ file_id ], res => {
    if( !res.result.length ) return callback({ status: 'error', text: 'file not exist' });

    var file_name = res.result[0].file_name;
    makeQuery(`DELETE FROM files WHERE file_id=?`, [ file_id ], res => {
      unlink( file_name, e => {
        callback( OK );
      } );
    }, callback);

  }, callback);
}
