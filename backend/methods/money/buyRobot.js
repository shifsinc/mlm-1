const { makeQuery, beginTransaction, checkUserPwd } = require('../../utils.js');
const { spendMoney } = require('../../money.js');
const { INCORRECT_QUERY, OK, ROBOT_LICENSE_VALID, ROBOT_SALE_TIME, RATES_PRICES } = require('../../const.js');
const addRobotKeys = require('../set/addRobotKeys.js');

module.exports = function(callback, params, _user_id){/*rate, account1, account2, current_password*/
  var rate = parseInt( params.rate ), pwd = params.current_password;
  if( isNaN(rate) || rate < 1 || rate > 4 ) return callback( INCORRECT_QUERY );

  checkUserPwd(_user_id, pwd, () => {

    makeQuery(`SELECT user_rate + 0 AS user_rate FROM users WHERE user_id=?`, [ _user_id ], res => {

      var cur_rate = res.result[0].user_rate;
      if( rate === cur_rate ){

        makeQuery(`UPDATE robot_keys SET key_valid_dt=DATE_ADD(key_valid_dt, INTERVAL ? MONTH) WHERE user_id=? AND key_rate=?`,
          [ ROBOT_LICENSE_VALID, _user_id, cur_rate ],
          res => {
            callback( OK );
          }, callback);

      } else if( rate < cur_rate ){

        makeQuery(`UPDATE users SET user_rate=? WHERE user_id=?`, [ rate, _user_id ], res => {
          callback( OK );
        }, callback);

      } else {

        makeQuery(`SELECT user_rate_ts FROM users WHERE user_id=?`,
          [ _user_id ],
          res => {

          var price, isSale = ( ( new Date() - new Date( res.result[0].user_rate_ts ) ) <= ROBOT_SALE_TIME );
          if( isSale && cur_rate ) price = RATES_PRICES[ rate ] - RATES_PRICES[ cur_rate ];
          else price = RATES_PRICES[ rate ];

            spendMoney(_user_id, price, (commit, rollback) => {

              const onError = e => {
                rollback();
                callback(e);
              }
              makeQuery(`UPDATE users SET user_rate=?, user_start_work=1 WHERE user_id=?`, [ rate, _user_id ], () => {
                addRobotKeys(r => {
                  if( r.status === 'error' ) return onError(r);

                  commit();
                  callback( OK );
                }, params, _user_id);
              }, onError);

            }, callback);

          }, callback);

      }

    }, callback);

  }, callback);
}
