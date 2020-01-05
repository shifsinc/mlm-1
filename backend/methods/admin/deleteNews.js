const { makeQuery } = require('../../utils.js');
const { INCORRECT_QUERY, OK } = require('../../const.js');

module.exports = function(callback, params, _user_id){/*news_id*/
  var news_id = parseInt( params.news_id );
  if( isNaN(news_id) ) return callback( INCORRECT_QUERY );

  makeQuery(`DELETE FROM news WHERE news_id=?`, [ news_id ], res => {
    callback( OK );
  }, callback);
}
