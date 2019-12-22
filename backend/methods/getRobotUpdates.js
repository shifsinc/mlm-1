const { makeQuery } = require('../utils.js');
const { INCORRECT_QUERY } = require('../const.js');

module.exports = function(callback, params){/*count, offset*/
  callback({ status: 'ok', result:{
    count: null,
    data: []
  } });
}
