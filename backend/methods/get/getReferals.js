const { makeQuery } = require('../../utils.js');
const { INCORRECT_QUERY } = require('../../const.js');
const { PHOTOS_PREFIX } = require('../../config.js');

module.exports = function(callback, params, _user_id){/*count, offset, pattern*/
  var count = parseInt( params.count ), offset = parseInt( params.offset ), pattern = params.pattern ? params.pattern + '%' : '%';
  if( isNaN(offset)  || isNaN(count) || count < 1 || count > 20 ) return callback( INCORRECT_QUERY );

  var sync = 0, left_ids, right_ids;
  const hnd = () => {
    if( sync ){

      var result_ids = left_ids.concat( right_ids );
      makeQuery(`SELECT
        user_id,
        user_refer,
        user_name,
        user_surname,
        user_photo,
        user_dt,
        user_rate + 0 AS user_rate
        FROM users
        WHERE user_id IN(?) AND user_login LIKE ?
        ORDER BY user_dt
        LIMIT ?,?`, [ result_ids, pattern, offset, count ],
        res => {

          makeQuery(`SELECT COUNT(*) AS count FROM users WHERE user_id IN(?) AND user_login LIKE ?`, [ result_ids, pattern ],
            count => {

              res.result.forEach(r => {
                r._user_direction = left_ids.includes( r.user_id ) ? 'l' : 'r';
                r._is_team = r.user_refer === _user_id ? true : false;
                r.user_photo_url = PHOTOS_PREFIX + r.user_photo
              });
              res.result = {
                count: count.result[0].count,
                data: res.result
              }
              callback(res);

            });

        }, callback);

    } else sync++;
  }

  _searchReferals(r => {
    left_ids = r;
    hnd();
  }, _user_id, 'l', callback);

  _searchReferals(r => {
    right_ids = r;
    hnd();
  }, _user_id, 'r', callback);

}

function _searchReferals(callback, user_ids, dir, onError, result = []){
  var _dir = '';
  if( dir ) _dir = ' AND user_refer_type=?';
  makeQuery(`SELECT user_id FROM users WHERE user_refer IN(?)` + _dir, [ user_ids, dir ],
    res => {
      if( !res.result.length ) return callback(result);
      var ids = res.result.map(u => u.user_id);
      result = result.concat( ids );
      _searchReferals(callback, ids, null, onError, result);
    }, onError);
}
