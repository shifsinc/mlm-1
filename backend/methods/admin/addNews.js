const { makeQuery } = require('../../utils.js');
const { INCORRECT_QUERY, OK } = require('../../const.js');

module.exports = function(callback, params, _user_id){/*title, text, section, images*/
  var title = params.title, text = params.text, section = params.section,
    images = Array.isArray( params.images ) ? params.images : null;
  if( !( /^(news|blog|robot_update)$/.test(section) ) ) return callback( INCORRECT_QUERY );

  makeQuery(`INSERT INTO news(news_author, news_title, news_text, news_type) VALUES(?,?,?,?)`, [ _user_id, title, text, section ],
  res => {
    if( images === null ) return callback( OK );

    var values = images.map(f => [ _user_id, 'news_image', res.insertId, f ]);
    makeQuery(`INSERT INTO files(file_author, file_section, file_fk, file_name) VALUES ?`, [ values ],
    res => {
        callback( OK );
      } , callback);
  });
}
