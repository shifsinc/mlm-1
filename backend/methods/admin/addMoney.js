const { makeQuery, checkUserPwd } = require('../../utils.js');
const { INCORRECT_QUERY, OK } = require('../../const.js');

module.exports = function(callback, params, _user_id){/*user_id, amount, current_password*/
  var user_id = parseInt( params.user_id ), amount = parseInt( params.amount ), pwd = params.current_password;
  if( isNaN(user_id) || isNaN(amount) ) return callback( INCORRECT_QUERY );

  checkUserPwd(_user_id, pwd, () => {

    makeQuery(`UPDATE accounts SET account_balance=account_balance+? WHERE account_owner=?`, [ amount, user_id ],
      res => {
        callback( OK );
      }, callback);

  }, callback);
}
