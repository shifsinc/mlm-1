const mysql = require('mysql');
const { MYSQL_AUTH } = require('./config.js');
const { INCORRECT_QUERY, AUTH_FAILED } = require('./const.js');


var _con;
function initMysqlConnection(onSuccess, onError){
  _con = mysql.createConnection( MYSQL_AUTH );
  _con.connect( err => {
    if(err && onError) onError( { status: 'error', text: err.sqlMessage/*'Internal error'*/ } );
    else onSuccess();
  });
}
function makeQuery(query, params = [], callback){
  if(!_con) return;
  _con.query(query, params, (err, result) => {
    if(callback) callback( err ? { status: 'error', text: err.sqlMessage/*'Internal error'*/ } : {status: 'ok', result} );
  });
}
module.exports.makeQuery = makeQuery;
module.exports.initMysqlConnection = initMysqlConnection;

///////////////////////

var checkAuth = (token, onSuccess, onFailed) => {
  if( !( /^[a-z0-9]{32}$/.test(token) ) ) return onFailed( INCORRECT_QUERY );
  onFailed( AUTH_FAILED );
  /*makeQuery(`SELECT user_id, role_id FROM users WHERE user_hash=?`, [ token ],
  res => {
    if(res.status == 'error') return onFailed( res );
    if(res.result.length === 1) onSuccess( res.result[0].user_id, res.result[0].role_id );
    else onFailed( AUTH_FAILED );
  });*/
}
module.exports.checkAuth = checkAuth;

//////////////////////

function parseGetParams(query){
  const _parse = () => query.split('&').reduce( (params, p) => {
    var _p = p.split('=');
    params[ decodeURIComponent( _p[0] ) ] = decodeURIComponent( _p[1] );
    return params;
  }, {});
  return typeof query == 'string' ? _parse() : {};
}
module.exports.parseGetParams = parseGetParams;

//////////////////////
