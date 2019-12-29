const { makeQuery } = require('../../utils.js');
const { INCORRECT_QUERY } = require('../../const.js');

module.exports = function(callback, params, _user_id){/*count, offset*/
  var count = params.count, offset = params.offset
  if( isNaN(offset)  || isNaN(count) || count < 1 || count > 20 ) return callback( INCORRECT_QUERY );

  makeQuery(`SELECT
    key_dt,
    key_account,
    key_max_deposit,
    key_license,
    key_valid_dt
    FROM robot_keys
    WHERE user_id=? AND key_rate=(SELECT user_rate FROM users WHERE user_id=?)
    ORDER BY key_dt DESC LIMIT ?,?`, [ _user_id, _user_id, offset, count ],
    res => {

      makeQuery(`SELECT COUNT(*) AS count FROM robot_keys WHERE user_id=?`, [ _user_id ],
        count => {
          res.result = {
            count: count.result[0].count,
            data: res.result
          }
          callback(res);
        }, callback);

  }, callback);
}
