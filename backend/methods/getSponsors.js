const { makeQuery } = require('../utils.js');
const { INCORRECT_QUERY } = require('../const.js');
const { PHOTOS_PREFIX } = require('../config.js');

module.exports = function(callback, params, _user_id){/*count, offset*/
  var count = params.count;/*, offset = params.offset;*/
  if( isNaN(count) || count < 1 || count > 20 /*|| isNaN(offset)*/ ) return callback( INCORRECT_QUERY );

  var fields = ['u1.user_id AS user_id_1',
  'u1.user_name AS user_name_1',
  'u1.user_surname AS user_surname_1',
  'u1.user_photo AS user_photo_1'],
    join = ['LEFT JOIN users u1 ON u0.user_refer=u1.user_id'];
  for(var i = 2 ; i <= count ; i++){
    fields.push('u' + i + '.user_id AS user_id_' + i,
    'u' + i + '.user_name AS user_name_' + i,
    'u' + i + '.user_surname AS user_surname_' + i,
    'u' + i + '.user_photo AS user_photo_' + i);
  	join.push('LEFT JOIN users u' + i + ' ON u' + (i - 1) + '.user_refer=u' + i + '.user_id');
  }
  var query = 'SELECT ' + fields.join(',') + ' FROM users u0 ' + join.join(' ') + ' WHERE u0.user_id=?';

  makeQuery(query, [ _user_id ],
    res => {
      var arr = [];
      for(var i = 1 ; i <= count ; i++){
        if( res.result[0]['user_id_' + i] === null ) break;
        arr.push({
          user_id: res.result[0]['user_id_' + i],
          user_name: res.result[0]['user_name_' + i],
          user_surname: res.result[0]['user_surname_' + i],
          user_photo: res.result[0]['user_photo_' + i],
          user_photo_url: PHOTOS_PREFIX + res.result[0]['user_photo_' + i]
        });
      }
      res.result = {
        count: null,
        data: arr
      }
      callback(res);
  }, callback);
}
