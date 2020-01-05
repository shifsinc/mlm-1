const { makeQuery } = require('../../utils.js');
const { INCORRECT_QUERY } = require('../../const.js');
const { FILES_PREFIX } = require('../../config.js');

module.exports = function(callback, params, _user_id){/*count, offset, section*/
  var count = parseInt( params.count ), offset = parseInt( params.offset ), section = params.section;
  if( isNaN(offset)  || isNaN(count) || count < 1 || count > 20 || !( /^(marketing|instructions|videos)$/.test(section) ) )
    return callback( INCORRECT_QUERY );

  makeQuery(`SELECT
    file_type,
    file_title,
    file_descr,
    file_name
    FROM files WHERE file_section=? ORDER BY file_dt DESC LIMIT ?,?`, [ section, offset, count ],
    res => {

      makeQuery(`SELECT COUNT(*) AS count FROM files WHERE file_section=?`, [ section ],
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
