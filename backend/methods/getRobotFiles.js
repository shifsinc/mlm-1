const { makeQuery } = require('../utils.js');
const { INCORRECT_QUERY } = require('../const.js');
const { FILES_PREFIX } = require('../config.js');

module.exports = function(callback, params, _user_id){/*count, offset*/
  var count = params.count, offset = params.offset
  if( isNaN(offset)  || isNaN(count) || count < 1 || count > 20 ) return callback( INCORRECT_QUERY );

  makeQuery(`SELECT
    file_type,
    file_title,
    file_descr,
    file_name
    FROM files WHERE file_section="robot" ORDER BY file_dt DESC LIMIT ?,?`, [ offset, count ],
    res => {

      makeQuery(`SELECT COUNT(*) AS count FROM files WHERE file_section="robot"`, [ section ],
        count => {
          res.result.forEach(r => r.file_url = FILES_PREFIX + r.file_name);
          res.result = {
            count: count.result[0].count,
            data: res.result
          }
          callback(res);
        }, callback);

  }, callback);
}
