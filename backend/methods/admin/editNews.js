const { makeQuery } = require('../../utils.js');
const { INCORRECT_QUERY, OK } = require('../../const.js');

module.exports = function(callback, params, _user_id){/*title, text, rate, news_id*/
  var title = params.title ? params.title : null, text = params.text ? params.text : null,
    rate = parseInt( params.rate ), news_id = parseInt( params.news_id );
  if( isNaN(rate) || !rate ) rate = null;
  if( ( rate !== null && ( rate < 1 || rate > 4 ) ) || isNaN(news_id) ) return callback( INCORRECT_QUERY );

  makeQuery(`UPDATE news SET news_title=?, news_text=?, news_rate=? WHERE news_id=?`, [ title, text, rate, news_id ],
    res => {
      callback( OK );
    }, callback);
}
