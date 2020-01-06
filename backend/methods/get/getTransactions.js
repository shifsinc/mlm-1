const { makeQuery } = require('../../utils.js');
const { INCORRECT_QUERY } = require('../../const.js');

module.exports = function(callback, params, _user_id){/*count, offset*/
  var count = parseInt( params.count ), offset = parseInt( params.offset );
  if( isNaN(offset)  || isNaN(count) || count < 1 || count > 20 ) return callback( INCORRECT_QUERY );

  makeQuery(`SELECT account_id FROM accounts WHERE account_owner=?`, [ _user_id ],
    res => {
      var acc_id = res.result[0].account_id;

      makeQuery(`SELECT
        tr_dt,
        tr_type,
        tr_real_amount,
        tr_platform_amount,
        tr_status
        FROM transactions
        WHERE tr_sender_id=? OR tr_receiver_id=? ORDER BY tr_dt DESC LIMIT ?,?`, [ acc_id, acc_id, offset, count ],
        res => {

          makeQuery(`SELECT COUNT(*) AS count FROM transactions WHERE tr_sender_id=? OR tr_receiver_id=?`, [ acc_id, acc_id ],
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
