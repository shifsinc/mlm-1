const { makeQuery, checkUserPwd, getUserAccount } = require('../../utils.js');
const { INCORRECT_QUERY, OK } = require('../../const.js');

module.exports = function(callback, params, _user_id){/*user_id, amount, current_password*/
  var user_id = parseInt( params.user_id ), amount = parseInt( params.amount ), pwd = params.current_password;
  if( isNaN(user_id) || isNaN(amount) ) return callback( INCORRECT_QUERY );

  checkUserPwd(_user_id, pwd, () => {
    getUserAccount(user_id, acc => {

        makeQuery(`INSERT INTO transactions(tr_platform_amount, tr_receiver_id, tr_type)
          VALUES(?,?,?)`, [ amount, acc.account_id, 'internal' ], res => {
            callback(OK);
        }, callback);

    }, callback);
  }, callback);
}
