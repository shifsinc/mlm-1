const { makeQuery } = require('../utils.js');
const { INCORRECT_QUERY } = require('../const.js');

module.exports = function(callback, params, _user_id){/*count, offset*/
  var count = params.count, offset = params.offset;
  if( isNaN(count) || count < 1 || count > 20 || isNaN(offset) ) return callback( INCORRECT_QUERY );

  makeQuery(`SELECT
    news_dt,
    news_title,
    news_text
    FROM news ORDER BY news_dt DESC LIMIT ?,?`, [ offset, count ],
    res => {
      callback(res);
  }, callback);
}
