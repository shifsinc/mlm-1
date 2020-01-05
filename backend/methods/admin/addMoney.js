const { makeQuery } = require('../../utils.js');
const { INCORRECT_QUERY, OK } = require('../../const.js');

module.exports = function(callback, params, _user_id){/*user_id, amount*/
  var user_id = parseInt( params.user_id ), amount = parseInt( params.amount );
  if( isNaN(user_id) || isNaN(amount) ) return callback( INCORRECT_QUERY );

  makeQuery(`UPDATE account SET account_balance=account_balance+? WHERE account_owner=?`, [ amount, user_id ],
    res => {
      callback( OK );
    }, callback);
}
