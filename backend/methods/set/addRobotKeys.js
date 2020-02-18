const { makeQueryAsync, checkUserPwd, checkSame } = require('../../utils.js');
const { INCORRECT_QUERY, OK, MAX_DEPOSITS, robotKeyRegexp, FORBIDDEN  } = require('../../const.js');
const hash = require('js-sha1');

module.exports = function(callback, params, _user_id){/*accounts, current_password*/
  var accounts = params.accounts, pwd = params.current_password;
  if( !Array.isArray( accounts ) ) return callback( INCORRECT_QUERY );

  checkUserPwd(_user_id, pwd, () => {
    _(callback, accounts, _user_id);
  }, callback);
}

async function _(callback, accounts, _user_id){
  if( checkSame(accounts) ) return callback( FORBIDDEN );
  var res = await makeQueryAsync(`SELECT user_rate + 0 AS user_rate, user_license_valid_dt FROM users WHERE user_id=?`, [ _user_id ]);
  if( res.status === 'error' ) return callback(res);

  var rate = res.result[0].user_rate, validDt = res.result[0].user_license_valid_dt;
  if( rate === null ) return callback( FORBIDDEN );

  var values = [], _values = [];
  for(var i = 0 ; i < accounts.length ; i++){
    var a = accounts[i];

    if( !robotKeyRegexp.test(a) ) return;
    var r = await makeQueryAsync(`SELECT key_key FROM robot_keys WHERE user_id=? AND key_account=?`, [ _user_id, a ]);
    if( r.status === 'error' ) return;

    var key;
    if( r.result.length ) key = r.result[0].key_key;
    else key = hash( Math.random() + '' ).slice(0, 7);
    values.push(`(?,?,?,?,?,?)`);
    _values.push( _user_id, rate, a, MAX_DEPOSITS[ rate ], validDt, key );
  }

  if( ( values.length === 2 && rate < 3 ) || values.length > 2 ) return callback( FORBIDDEN );

  var res = makeQueryAsync(`DELETE FROM robot_keys WHERE user_id=?`, [ _user_id ]);
  if( res.status === 'error' ) return callback(res);

  res = await makeQueryAsync(`INSERT INTO robot_keys(user_id, key_rate, key_account, key_max_deposit, key_valid_dt, key_key)
    VALUES ${values.join(',')}`, _values);
  if( res.status === 'error' ) callback(res);
  else callback( OK );
}
