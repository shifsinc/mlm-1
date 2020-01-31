const { makeQuery } = require('../../utils.js');
const { INCORRECT_QUERY, OK } = require('../../const.js');
const { unlink } = require('fs');
const { FILES_PATH } = require('../../config.js');

module.exports = function(callback, params, _user_id){/*news_id*/
  var news_id = parseInt( params.news_id );
  if( isNaN(news_id) ) return callback( INCORRECT_QUERY );

  makeQuery(`SELECT file_name FROM files WHERE file_fk=?`, [ news_id ], res => {
    var files = res.result;

    makeQuery(`DELETE FROM files WHERE file_fk=?`, [ news_id ], () => {
      files.forEach(f => unlink( FILES_PATH + f.file_name, () => {}));

      makeQuery(`DELETE FROM news WHERE news_id=?`, [ news_id ], res => {
        callback( OK );
      }, callback);
    });
  });
}
