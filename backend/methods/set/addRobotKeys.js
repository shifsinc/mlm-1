const { makeQuery, checkUserPwd } = require('../../utils.js');
const { INCORRECT_QUERY, OK, MAX_DEPOSITS, ROBOT_LICENSE_VALID, robotKeyRegexp, FORBIDDEN  } = require('../../const.js');

module.exports = function(callback, params, _user_id){/*accounts, current_password*/
  var accounts = params.accounts, pwd = params.current_password;
  if( !Array.isArray( accounts ) ) return callback( INCORRECT_QUERY );

  checkUserPwd(_user_id, pwd, () => {
    makeQuery(`SELECT user_rate + 0 AS user_rate, user_license_valid_dt FROM users WHERE user_id=?`, [ _user_id ], res => {
      var rate = res.result[0].user_rate, validDt = res.result[0].user_license_valid_dt;
      if( rate === null ) return callback( FORBIDDEN );

      var values = [], _values = [];
      accounts.forEach(a => {
        if( !robotKeyRegexp.test(a) ) return;
        /*values.push(`(?,?,?,?,?)`);
        _values.push( ...[ _user_id, rate, a, MAX_DEPOSITS[ rate ], validDt ] );*/
        values.push(`(?,?,?,?)`);
        _values.push( _user_id, a, MAX_DEPOSITS[ rate ], validDt );
      });

      if( ( values.length === 2 && rate < 3 ) || values.length > 2 ) return callback( FORBIDDEN );

      makeQuery(`DELETE FROM robot_keys WHERE user_id=?/* AND key_rate=?*/`, [ _user_id/*, rate*/ ],
        res => {

          makeQuery(`INSERT INTO robot_keys(user_id, /*key_rate,*/ key_account, key_max_deposit, key_valid_dt)
            VALUES ` + values.join(','), _values,
            res => {
              callback( OK );
            }, callback);

        }, callback);

    });

  }, callback);
}
