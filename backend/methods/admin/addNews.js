const { makeQuery } = require('../../utils.js');
const { INCORRECT_QUERY, OK } = require('../../const.js');

module.exports = function(callback, params, _user_id){/*title, text, section, rate, images, videos*/
  var title = params.title ? params.title : null, text = params.text ? params.text : null,
    section = params.section, rate = parseInt(params.rate),
    images = Array.isArray( params.images ) ? params.images : null;
    videos = Array.isArray( params.videos ) ? params.videos : null;
  if( isNaN(rate) || !rate ) rate = null;
  if( !( /^(news|blog|robot_update)$/.test(section) ) ||
    ( rate !== null && ( rate < 1 || rate > 4 ) )) return callback( INCORRECT_QUERY );

  makeQuery(`INSERT INTO news(news_author, news_rate, news_title, news_text, news_type) VALUES(?,?,?,?,?)`,
    [ _user_id, rate, title, text, section ],
    res => {
      var img_val = [], vid_val = [];
      if( images !== null ){
        img_val = images.map(f => [ _user_id, 'news_image', res.result.insertId, null, f ]);
      }
      if( videos !== null ){
        videos = videos.filter(f => !!f);
        vid_val = videos.map(f => [ _user_id, 'news_video', res.result.insertId, f, null ]);
      }
      var values = img_val.concat(vid_val);
      if( !values.length ) return callback( OK );


      makeQuery(`INSERT INTO files(file_author, file_section, file_fk, file_descr, file_name) VALUES ?`, [ values ],
      res => {
          callback( OK );
        } , callback);
    }, callback);
}
