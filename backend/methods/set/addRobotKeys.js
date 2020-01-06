const { makeQuery, checkUserPwd } = require('../../utils.js');
const { INCORRECT_QUERY, OK, MAX_DEPOSITS, ROBOT_LICENSE_VALID  } = require('../../const.js');

module.exports = function(callback, params, _user_id){/*account1, account2, rate, current_password*/
  var account1 = parseInt( params.account1 ), account2 = parseInt( params.account2 ),
    rate = parseInt( params.rate ), pwd = params.current_password;
  if( isNaN( account1 ) || isNaN(rate) || rate < 1 || rate > 4  )
    return callback( INCORRECT_QUERY );

  checkUserPwd(_user_id, pwd, () => {

    var values, _values;
    if( !isNaN( account2 ) && rate >= 3 ){
      values = `(?,?,?,?,DATE_ADD(current_timestamp, INTERVAL ? MONTH)),
        (?,?,?,?,DATE_ADD(current_timestamp, INTERVAL ? MONTH))`;
      _values = [
          _user_id, rate, account1, MAX_DEPOSITS[ rate ], ROBOT_LICENSE_VALID,
          _user_id, rate, account2, MAX_DEPOSITS[ rate ], ROBOT_LICENSE_VALID
        ];
    } else {
      values = `(?,?,?,?,DATE_ADD(current_timestamp, INTERVAL ? MONTH))`;
      _values = [ _user_id, rate, account1, MAX_DEPOSITS[ rate ], ROBOT_LICENSE_VALID ];
    }
    makeQuery(`DELETE FROM robot_keys WHERE user_id=? AND key_rate=?`, [ _user_id, rate ],
      res => {

        makeQuery(`INSERT INTO robot_keys(user_id, key_rate, key_account, key_max_deposit, key_valid_dt)
          VALUES` + values, _values,
          res => {
            callback( OK );
          }, callback);

      }, callback);

  }, callback);
}
