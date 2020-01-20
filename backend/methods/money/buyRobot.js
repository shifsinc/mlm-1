const { makeQuery, beginTransaction, checkUserPwd } = require('../../utils.js');
const { spendMoney } = require('../../money.js');
const { INCORRECT_QUERY, OK, ROBOT_LICENSE_VALID, ROBOT_SALE_TIME, RATES_PRICES } = require('../../const.js');

module.exports = function(callback, params, _user_id){/*rate, current_password*/
  var rate = parseInt( params.rate ), pwd = params.current_password;
  if( isNaN(rate) || rate < 1 || rate > 4 ) return callback( INCORRECT_QUERY );

  checkUserPwd(_user_id, pwd, () => {

    makeQuery(`SELECT user_rate + 0 AS user_rate FROM users WHERE user_id=?`, [ _user_id ], res => {
      var cur_rate = res.result[0].user_rate;

      makeQuery(`SELECT user_rate_ts FROM users WHERE user_id=?`, [ _user_id ],
        res => {
        var rateTs = res.result[0].user_rate_ts;
        var isUpgrade = rateTs && ( ( new Date() - new Date( rateTs ) ) <= ROBOT_SALE_TIME ), price;
        
        if( isUpgrade && cur_rate ) price = RATES_PRICES[ rate ] - RATES_PRICES[ cur_rate ];
        else price = RATES_PRICES[ rate ];

          spendMoney(_user_id, price, (commit, rollback) => {

            const onError = e => {
              rollback();
              callback(e);
            }
            var licenseUpdate = '';
            if( !isUpgrade )
              licenseUpdate = `, user_license_valid_dt=DATE_ADD(current_timestamp, INTERVAL ${ROBOT_LICENSE_VALID} MONTH)`;

            makeQuery(`UPDATE users SET user_rate=?, user_start_work=1${licenseUpdate} WHERE user_id=?`, [ rate, _user_id ], () => {
              commit();
              callback( OK );
            }, onError);

          }, callback);

        }, callback);

    }, callback);

  }, callback);
}
