const { makeQuery } = require('../../utils.js');
const { INCORRECT_QUERY } = require('../../const.js');

module.exports = function(callback, params, _user_id){/*count, offset*/
  var count = parseInt( params.count ), offset = parseInt( params.offset );
  if( isNaN(offset)  || isNaN(count) || count < 1 || count > 20 ) return callback( INCORRECT_QUERY );

  makeQuery(`SELECT
    news_dt,
    news_title,
    news_text
    FROM news
    WHERE news_type="robot_update" AND news_rate=(SELECT user_rate FROM users WHERE user_id=?)
    ORDER BY news_dt DESC LIMIT ?,?`, [ _user_id, offset, count ],
    res => {

      makeQuery(`SELECT COUNT(*) AS count FROM news WHERE news_type="robot_update"`, [],
        count => {
          res.result = {
            count: count.result[0].count,
            data: res.result
          }
          callback(res);
        }, callback);

  }, callback);
}
