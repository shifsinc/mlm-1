/*every 10 min*/
const { initMysqlConnection, makeQuery } = require('../utils.js');
const { ADMIN_ETH, ETHERSCAN_TOKEN } = require('../config.js');
const ethApi = require('etherscan-api').init(ETHERSCAN_TOKEN);

initMysqlConnection(() => {

  makeQuery(`SELECT
    t.tr_id,
    t.tr_dt,
    t.tr_real_amount,
    a.account_ethereum
    FROM transactions t
    JOIN accounts a ON t.tr_receiver_id = a.account_id
    WHERE tr_type='in' AND tr_status='wait' AND tr_pay_method='ethereum'`, [],
      res => {
        if( !res.result.length ) return;

        ethApi.account.txlist(ADMIN_ETH).then(tr => {
          if( tr.message === 'OK' ) _hnd(res.result, tr);
        }).catch(console.log);

      }, console.log)

}, console.log);

function _hnd(internal_tr, eth_tr){
  internal_tr.forEach(i_tr => {
    eth_tr.result.forEach(e_tr => {

      var e_tr_value = ( e_tr.value / 1000000000000000000 ).toFixed(5), i_tr_value = parseFloat( i_tr.tr_real_amount).toFixed(5);
      if( e_tr.from === i_tr.account_ethereum && e_tr_value === i_tr_value)
        makeQuery(`UPDATE transactions SET tr_status='ok' WHERE tr_id=?`, [ i_tr.tr_id ]);

    });
  });
}
