const { makeQuery } = require('../../utils.js');

module.exports = function(callback, params, _user_id){/**/
  makeQuery(`SELECT user_start_work FROM users WHERE user_id=?`, [ _user_id ],
    res => {
      res.result = res.result[0];
      callback(res);
    }, callback);
}
