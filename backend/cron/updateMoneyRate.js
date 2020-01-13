/*every hour*/
const { initMysqlConnection, makeQuery } = require('../utils.js');
const https = require('https');

initMysqlConnection(() => {

  var req = https.request({
    hostname: 'api.binance.com',
    path: '/api/v3/trades?symbol=ETHUSDT&limit=1'
  }, onResponse);

  req.on('error', console.log);
  req.end();

}, console.log);

function onResponse(res){
  var data = '';
  res.on('data', d => data += d);

  res.on('end', () => {
    try {
      var json = JSON.parse( data );
    } catch(e){ console.log(e); return; }
    if( !json.length ) return;

    var rate = (1 / json[0].price).toFixed(6);
    makeQuery(`UPDATE money_rate SET rate_eth=?`, [ rate ]);

    process.exit();
  });
}
