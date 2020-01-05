const { makeQuery } = require('../../utils.js');
const { INCORRECT_QUERY } = require('../../const.js');

module.exports = function(callback, params, _user_id){/*count, offset, section*/
  var count = parseInt( params.count ), offset = parseInt( params.offset ), section = params.section;
  if( isNaN(offset)  || isNaN(count) || count < 1 || count > 20 || !/^(news|blog)$/.test(section) ) return callback( INCORRECT_QUERY );

  makeQuery(`SELECT
    news_dt,
    news_title,
    news_text
    FROM news WHERE news_type=? ORDER BY news_dt DESC LIMIT ?,?`, [ section, offset, count ],
    res => {

      makeQuery(`SELECT COUNT(*) AS count FROM news WHERE news_type=?`, [ section ],
        count => {
          res.result = {
            count: count.result[0].count,
            data: res.result
          }
          callback(res);
        }, callback);

  }, callback);
}
