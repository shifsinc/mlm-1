const { makeQuery } = require('../../utils.js');
const { INCORRECT_QUERY, OK } = require('../../const.js');

module.exports = function(callback, params, _user_id){/**/
  makeQuery(`SELECT * FROM analytics`, [],
    res => {
      callback( res.result[0] );
  }, callback);
}
