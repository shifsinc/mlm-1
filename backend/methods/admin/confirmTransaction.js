const { confirmTransaction } = require('../../money.js');
const { INCORRECT_QUERY, OK } = require('../../const.js');

module.exports = function(callback, params, _user_id){/*tr_id*/
  var tr_id = parseInt( params.tr_id );
  if( isNaN(tr_id) ) return callback( INCORRECT_QUERY );

  confirmTransaction(tr_id, () => {
    callback( OK );
  }, callback);
}
