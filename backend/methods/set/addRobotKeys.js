const { makeQuery, checkUserPwd } = require('../../utils.js');
const { INCORRECT_QUERY, OK, MAX_DEPOSITS  } = require('../../const.js');

module.exports = function(callback, params, _user_id){/*account1, account2, rate, current_password*/
  var account1 = parseInt( params.account1 ), account2 = parseInt( params.account2 ),
    rate = params.rate,  current_password = params.current_password;
  if( isNaN( account1 ) || ( account2 && isNaN(account2) ) || !( /^client|light|advanced|master$/.test(rate) )  )
    return callback( INCORRECT_QUERY );

  var values, _values;
  if( account2 && ( rate === 'advanced' || rate === 'master' ) ){
    values = '(?,?,?,?,DATE_ADD(current_timestamp, INTERVAL 1 MONTH)),(?,?,?,?,DATE_ADD(current_timestamp, INTERVAL 1 MONTH))';
    _values = [ _user_id, rate, account1, MAX_DEPOSITS[ rate ], _user_id, rate, account2, MAX_DEPOSITS[ rate ] ];
  } else {
    values = '(?,?,?,?,DATE_ADD(current_timestamp, INTERVAL 1 MONTH))';
    _values = [ _user_id, rate, account1, MAX_DEPOSITS[ rate ] ];
  }

  checkUserPwd(_user_id, current_password, r => {

    makeQuery(`SELECT user_rate FROM users WHERE user_id=?`, [ _user_id ], res => {
      var rate = res.result[0].user_rate;
      makeQuery(`INSERT INTO robot_keys(user_id, key_rate, key_account, key_max_deposit, key_valid_dt)
        VALUES` + values,
        _values,
        res => {
          callback( OK );
        }, callback);

    }, callback);

  }, callback);
}
