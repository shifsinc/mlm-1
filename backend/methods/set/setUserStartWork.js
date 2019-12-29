const { makeQuery } = require('../../utils.js');
const { OK } = require('../../const.js');

module.exports = function(callback, params, _user_id){/**/
  makeQuery(`UPDATE users SET user_start_work=1 WHERE user_id=?`, [ _user_id ],
    res => {
      callback( OK );
    }, callback);
}
