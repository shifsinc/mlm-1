const { makeQuery } = require('../../utils.js');
const { INCORRECT_QUERY } = require('../../const.js');
const { FILES_PREFIX } = require('../../config.js');

module.exports = function(callback, params, _user_id){/*count, offset*/
  var count = parseInt( params.count ), offset = parseInt( params.offset );
  if( isNaN(offset)  || isNaN(count) || count < 1 || count > 20 ) return callback( INCORRECT_QUERY );

  makeQuery(`SELECT user_rate FROM users WHERE user_id=?`, [ _user_id ],
    res =>{

      var user_rate = res.result[0].user_rate;
      makeQuery(`SELECT
        file_type,
        file_title,
        file_descr,
        file_name
        FROM files WHERE file_section="robot" AND file_rate=? ORDER BY file_dt DESC LIMIT ?,?`,
        [ user_rate, offset, count ],
        res => {

          makeQuery(`SELECT COUNT(*) AS count FROM files WHERE file_section="robot" AND file_rate=?`, [ user_rate ],
            count => {
              res.result.forEach(r => r.file_url = FILES_PREFIX + r.file_name);
              res.result = {
                count: count.result[0].count,
                data: res.result
              }
              callback(res);
            }, callback);

      }, callback);

    }, callback);
}
