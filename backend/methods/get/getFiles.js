const { makeQuery } = require('../../utils.js');
const { INCORRECT_QUERY } = require('../../const.js');
const { FILES_PREFIX } = require('../../config.js');

module.exports = function(callback, params, _user_id){/*count, offset, section*/
  var count = parseInt( params.count ), offset = parseInt( params.offset ), section = params.section;
  if( isNaN(offset)  || isNaN(count) || count < 1 || count > 20 || !( /^(marketing|instructions|videos|robot)$/.test(section) ) )
    return callback( INCORRECT_QUERY );

  makeQuery(`SELECT
    file_type,
    file_title,
    file_descr,
    file_name
    FROM files
    WHERE file_section=? AND (file_rate=(SELECT user_rate FROM users WHERE user_id=?) OR file_rate IS NULL)
    ORDER BY file_dt DESC LIMIT ?,?`, [ section, _user_id, offset, count ],
    res => {

      makeQuery(`SELECT COUNT(*) AS count FROM files
      WHERE file_section=? AND (file_rate=(SELECT user_rate FROM users WHERE user_id=?) OR file_rate IS NULL)`, [ section, _user_id ],
        count => {
          var resp = Object.assign({}, res, { result: {
            count: count.result[0].count,
            data: res.result
          } });
          resp.result.data.forEach(r => r.file_type !== 'youtube' && (r.file_url = FILES_PREFIX + r.file_name));
          callback(resp);
        }, callback);

  }, callback);
}
