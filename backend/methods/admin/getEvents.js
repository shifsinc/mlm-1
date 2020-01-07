const { makeQuery } = require('../../utils.js');
const { INCORRECT_QUERY, OK } = require('../../const.js');

module.exports = function(callback, params, _user_id){/*offset, count*/
  var offset = parseInt( params.offset ), count = parseInt( params.count );
  if( isNaN(offset)  || isNaN(count) || count < 1 || count > 50 ) return callback( INCORRECT_QUERY );

  makeQuery(`SELECT
    e.*,
    t.*,
    u.user_name,
    u.user_surname,
    u.user_rate,
    u.user_status,
    a.account_ethereum
    FROM events e
    LEFT JOIN transactions t ON e.tr_id=t.tr_id
    LEFT JOIN users u ON e.user_id=u.user_id
    LEFT JOIN accounts a ON e.user_id=a.account_owner
    ORDER BY e.event_dt DESC
    LIMIT ?,?`, [ offset, count ],
    res => {

      makeQuery(`SELECT COUNT(*) AS count FROM events`, [], count => {
        res.result = {
          count: count.result[0].count,
          data: res.result
        }
        callback(res);
      }, callback);

  }, callback);
}
