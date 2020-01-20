const { makeQuery, beginTransaction, checkUserPwd } = require('../../utils.js');
const { spendMoney } = require('../../money.js');
const { OK, ROBOT_LICENSE_VALID, RATES_PRICES } = require('../../const.js');

module.exports = function(callback, params, _user_id){/*current_password*/
  var pwd = params.current_password;

  checkUserPwd(_user_id, pwd, () => {

    makeQuery(`SELECT user_rate + 0 AS user_rate FROM users WHERE user_id=?`, [ _user_id ], res => {
      var cur_rate = res.result[0].user_rate;

      spendMoney(_user_id, RATES_PRICES[ cur_rate ], (commit, rollback) => {

        makeQuery(`UPDATE users SET
          user_license_valid_dt=DATE_ADD(user_license_valid_dt, INTERVAL ? MONTH)
          WHERE user_id=?`,
          [ ROBOT_LICENSE_VALID, _user_id ],
          res => {
            commit();
            callback( OK );
          }, e => {
            rollback();
            callback(e);
          });

      });

    }, callback);

  }, callback);
}
