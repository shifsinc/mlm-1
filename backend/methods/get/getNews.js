const { makeQuery } = require('../../utils.js');
const { INCORRECT_QUERY, NO_DATA_PAGES } = require('../../const.js');
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
    WHERE news_type=? AND (news_rate=(SELECT user_rate FROM users WHERE user_id=?) OR news_rate IS NULL)
    ORDER BY news_dt DESC LIMIT ?,?`, [ section, _user_id, offset, count ],
    res => {
      var news_ids = res.result.map(r => r.news_id);
      if( !news_ids.length ) return callback( NO_DATA_PAGES );
      makeQuery(`SELECT file_name, file_descr, file_fk, file_section FROM files
        WHERE (file_section="news_image" OR file_section="news_video") AND file_fk IN (?)`, [ news_ids ],
        files => {

          files = files.result;
          res.result.forEach(r => {
            var img = [], vid = [];
            files.forEach(f => {
              if( f.file_fk === r.news_id && f.file_section === 'news_image' )
                img.push( Object.assign( {}, f, { file_name: FILES_PREFIX + f.file_name }) );
              if( f.file_fk === r.news_id && f.file_section === 'news_video' )
                vid.push( f );
            });
            r.images = img;
            r.videos = vid;
          });

          makeQuery(`SELECT COUNT(*) AS count FROM news
            WHERE news_type=? AND (news_rate=(SELECT user_rate FROM users WHERE user_id=?) OR news_rate IS NULL)`,
            [ section, _user_id ],
            count => {
              var resp = Object.assign({}, res, { result: {
                count: count.result[0].count,
                data: res.result
              } });
              callback(resp);
            }, callback);

        }, callback);

  }, callback);
}
