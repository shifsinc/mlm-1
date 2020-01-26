/*every 10 min*/
const { initMysqlConnection, makeQuery } = require('../utils.js');
const { ADMIN_ETH, ETHERSCAN_TOKEN } = require('../config.js');
const { TRANSACTION_TIMEOUT } = require('../const.js');
const ethApi = require('etherscan-api').init( ETHERSCAN_TOKEN );

initMysqlConnection(() => {

  makeQuery(`UPDATE transactions SET tr_status='rejected' WHERE tr_status='wait' AND NOW() - tr_dt > ?`, [ TRANSACTION_TIMEOUT ],
    () => {
      makeQuery(`SELECT
        t.tr_id,
        t.tr_real_amount,
        a.account_ethereum
        FROM transactions t
        JOIN accounts a ON t.tr_receiver_id = a.account_id
        WHERE tr_type='in' AND tr_status='wait' AND tr_pay_method='ethereum'`, [],
          res => {
            if( !res.result.length ) return;

            ethApi.account.txlist(ADMIN_ETH).then(tr => {
              if( tr.message !== 'OK' ) return;
              _hnd(res.result, tr);
            }).catch(console.log);

          });
    });

});

function _hnd(internal_tr, external_tr){
  external_tr.result.forEach(e_tr => {
    makeQuery(`SELECT tr_id FROM transactions WHERE tr_external_id=?`, [ e_tr.hash ], res => {
      if( res.result.length ) return;

      for( var i = 0 ; i < internal_tr.length ; i++ ){

        var i_tr = internal_tr[i];
        var e_tr_value = ( e_tr.value / 1000000000000000000 ).toFixed(5),
          i_tr_value = parseFloat( i_tr.tr_real_amount).toFixed(5);
        if( e_tr.from === i_tr.account_ethereum && e_tr_value === i_tr_value){
          makeQuery(`UPDATE transactions SET tr_status='ok', tr_external_id=? WHERE tr_id=?`, [ e_tr.hash, i_tr.tr_id ]);
          break;
        }

      }

    });
  });
}
