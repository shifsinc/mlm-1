const { makeQuery } = require('../../utils.js');
const { OK } = require('../../const.js');

module.exports = function(callback, params, _user_id){/**/
  makeQuery(`SELECT * FROM money_rate`, [], res => {
    var rate = res.result[0];
    var resp = Obejct.assign({}, OK, { result: rate });
    callback(resp);
  }, callback);
}
