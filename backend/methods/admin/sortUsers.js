const { makeQuery } = require('../../utils.js');
const { INCORRECT_QUERY, PHOTOS_PREFIX } = require('../../const.js');

module.exports = function(callback, params, _user_id){/*sort, offset, count*/
  var count = parseInt( params.count ), offset = parseInt( params.offset ), sort = params.sort;
  if( isNaN(offset)  || isNaN(count) || count < 1 || count > 50 || sort === undefined ) return callback( INCORRECT_QUERY );

  var order;
  switch(sort){
    case 'withdraw': order = 'a.account_withdraws DESC'; break;
    default: return callback( INCORRECT_QUERY );
  }

  makeQuery(`SELECT
    u.user_id,
    u.user_name,
    u.user_surname,
    a.account_withdraws
    FROM users u
    LEFT JOIN accounts a ON u.user_id=a.account_owner
    ORDER BY ` + order + `
    LIMIT ?,?`, [ offset, count ],
    res => {

      makeQuery(`SELECT COUNT(*) AS count FROM users`, [], count => {
        res.result.forEach(r => r.user_photo_url = PHOTOS_PREFIX + r.user_photo);
        res.result = {
          count: count.result[0].count,
          data: res.result
        }
        callback(res);
      }, callback);

  }, callback);
}
