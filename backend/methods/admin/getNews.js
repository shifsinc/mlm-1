const { makeQuery } = require('../../utils.js');
const { INCORRECT_QUERY } = require('../../const.js');
const { FILES_PREFIX } = require('../../config.js');

module.exports = function(callback, params, _user_id){/*count, offset, section*/
  var count = parseInt( params.count ), offset = parseInt( params.offset ), section = params.section;
  if( isNaN(offset)  || isNaN(count) || count < 1 || count > 20 || !/^(news|blog|robot_update)$/.test(section) )
    return callback( INCORRECT_QUERY );

  makeQuery(`SELECT
    news_id,
    news_dt,
    news_title,
    news_text
    FROM news
    WHERE news_type=?
    ORDER BY news_dt DESC LIMIT ?,?`, [ section, offset, count ],
    res => {
      var news_ids = res.result.map(r => r.news_id);
      makeQuery(`SELECT file_name, file_descr, file_fk, file_section FROM files
        WHERE (file_section="news_image" OR file_section="news_video") AND file_fk IN (?)`, [ news_ids ],
        files => {

          files = files.result;
          res.result.forEach(r => {
            var img = [], vid = [];
            files.forEach(f => {
              if( f.file_fk === r.news_id && f.file_section === 'news_image' ) img.push( FILES_PREFIX + f.file_name );
              if( f.file_fk === r.news_id && f.file_section === 'news_video' ) vid.push( f.file_descr );
            });
            r.images = img;
            r.videos = vid;
          });

          makeQuery(`SELECT COUNT(*) AS count FROM news WHERE news_type=?`,
            [ section ],
            count => {
              res.result = {
                count: count.result[0].count,
                data: res.result
              }
              callback(res);
            }, callback);

        }, callback);

  }, callback);
}
