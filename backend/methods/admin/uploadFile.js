const { makeQuery } = require('../../utils.js');
const { INCORRECT_QUERY } = require('../../const.js');
const { FILES_PATH } = require('../../config.js');
const md5 = require('js-md5');
const { writeFile } = require('fs');

module.exports = function(callback, params, _user_id){/*_file*/
  var filename = md5(params._file);
  writeFile( FILES_PATH + filename, params._file, e => {
    callback({ status: 'ok', result: { filename } });
  });
}
