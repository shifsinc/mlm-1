const { makeQuery } = require('../../utils.js');
const { INCORRECT_QUERY } = require('../../const.js');

module.exports = function(callback, params, _user_id){/*count, offset, rate*/
  var count = parseInt( params.count ), offset = parseInt( params.offset ), rate = parseInt( params.rate );
  if( isNaN(offset)  || isNaN(count) || count < 1 || count > 20 || rate < 1 || rate > 4 ) return callback( INCORRECT_QUERY );
  
  makeQuery(`SELECT
    key_dt,
    key_account,
    key_rate+0 AS key_rate,
    key_max_deposit,
    key_valid_dt
    FROM robot_keys WHERE user_id=? ` + /*AND key_rate=?*/
    `ORDER BY key_dt DESC LIMIT ?,?`, [ _user_id, /*rate,*/ offset, count ],
    res => {

      makeQuery(`SELECT COUNT(*) AS count FROM robot_keys
        WHERE user_id=? /*AND key_rate=?*/`, [ _user_id/*, rate*/ ],
        count => {
          var resp = Object.assign({}, res, { result: {
            count: count.result[0].count,
            data: res.result
          } });
          callback(resp);
        }, callback);

  }, callback);
}
