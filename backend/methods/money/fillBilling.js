const { makeQuery } = require('../../utils.js');
const { INCORRECT_QUERY, OK, ethereumRegexp, FORBIDDEN } = require('../../const.js');

module.exports = function(callback, params, _user_id){/*ethereum*/
    var ethereum = params.ethereum;
    if( ethereum === undefined || !ethereumRegexp.test(ethereum) ) return callback( INCORRECT_QUERY );

    makeQuery(`SELECT user_start_work FROM users WHERE user_id=?`, [ _user_id ],
      res => {
        if( res.result[0].user_start_work ) return callback( FORBIDDEN );

        makeQuery(`UPDATE accounts SET account_ethereum=? WHERE account_owner=?`, [ ethereum, _user_id ],
          res => {
            var resp = Object.assign({}, OK, { action: { text: 'Платежные данные успешно обновлены!' } });
            callback(resp);
          }, callback);

      }, callback);

}
