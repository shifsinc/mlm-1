const { makeQuery } = require('../../utils.js');
const { INCORRECT_QUERY } = require('../../const.js');
const { PHOTOS_PATH } = require('../../config.js');
const md5 = require('js-md5');
const { writeFile } = require('fs');

module.exports = function(callback, params, _user_id){/*_file*/
  var filename = md5(params._file);
  writeFile( PHOTOS_PATH + filename, params._file, r => {
    callback({ status: 'ok', result: { filename } });
  });
}
