const { makeQuery, beginTransaction, checkUserPwd } = require('../../utils.js');
const { spendMoney } = require('../../money.js');
const { INCORRECT_QUERY, OK, ROBOT_LICENSE_VALID, ROBOT_SALE_TIME, RATES_PRICES, FORBIDDEN } = require('../../const.js');

module.exports = function(callback, params, _user_id){/*rate, current_password*/
  var rate = parseInt( params.rate ), pwd = params.current_password;
  if( isNaN(rate) || rate < 1 || rate > 4 ) return callback( INCORRECT_QUERY );

  checkUserPwd(_user_id, pwd, () => {

    makeQuery(`SELECT user_rate + 0 AS user_rate, user_rate_ts, user_rate_first FROM users WHERE user_id=?`, [ _user_id ], res => {
      var { user_rate, user_rate_ts, user_rate_first } = res.result[0];
      if( user_rate !== null && rate <= user_rate ) return callback( FORBIDDEN );
      
      var isUpgrade = (user_rate_first !== null) && ( ( new Date() - new Date( user_rate_ts ) ) <= ROBOT_SALE_TIME ), price;

      if( isUpgrade ) price = RATES_PRICES[ rate ] - RATES_PRICES[ user_rate ];
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
}
