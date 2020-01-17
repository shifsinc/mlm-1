const { makeQuery } = require('../../utils.js');
const { INCORRECT_QUERY } = require('../../const.js');

module.exports = function(callback, params, _user_id){/*count, offset*/
  var count = parseInt( params.count ), offset = parseInt( params.offset );
  if( isNaN(offset)  || isNaN(count) || count < 1 || count > 20 ) return callback( INCORRECT_QUERY );

  makeQuery(`SELECT account_id FROM accounts WHERE account_owner=?`, [ _user_id ],
    res => {
      var acc_id = res.result[0].account_id;

      makeQuery(`SELECT
        t.tr_dt,
        t.tr_type,
        t.tr_real_amount,
        t.tr_platform_amount,
        t.tr_status,
        u1.user_id AS sender_id,
        u1.user_phone AS sender_code,
        u2.user_id AS receiver_id,
        u2.user_phone AS receiver_code
        FROM transactions t
        LEFT JOIN accounts a1 ON a1.account_id=t.tr_sender_id LEFT JOIN users u1 ON u1.user_id=a1.account_owner
        LEFT JOIN accounts a2 ON a2.account_id=t.tr_receiver_id LEFT JOIN users u2 ON u2.user_id=a2.account_owner
        WHERE tr_sender_id=? OR tr_receiver_id=? ORDER BY tr_dt DESC LIMIT ?,?`, [ acc_id, acc_id, offset, count ],
        res => {

          makeQuery(`SELECT COUNT(*) AS count FROM transactions WHERE tr_sender_id=? OR tr_receiver_id=?`, [ acc_id, acc_id ],
            count => {
              res.result = {
                count: count.result[0].count,
                data: res.result.map(r => {
                  if( r.tr_type === 'internal' ) r._is_sender =  ( r.sender_id === _user_id ) ? true : false;
                  return r;
                })
              }
              callback(res);
            }, callback);

      }, callback);

    }, callback);
}
