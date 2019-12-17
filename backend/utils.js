const mysql = require('mysql');
const { MYSQL_AUTH } = require('./config.js');
const { INCORRECT_QUERY, AUTH_FAILED, tokenRegexp, ADMIN_ROLE, FORBIDDEN } = require('./const.js');


var _con;
function initMysqlConnection(onSuccess, onError){
  _con = mysql.createConnection( MYSQL_AUTH );
  _con.connect( err => {
    if(err && onError) onError( { status: 'error', text: err.sqlMessage/*'Internal error'*/ } );
    else onSuccess();
  });
}
function makeQuery(query, params = [], onSuccess, onError){
  if(!_con) return;
  _con.query(query, params, (err, result) => {
    if(err) onError && onError({ status: 'error', text: err.sqlMessage/*'Internal error'*/ });
    else onSuccess && onSuccess({ status: 'ok', result } );
  });
}
module.exports.makeQuery = makeQuery;
module.exports.initMysqlConnection = initMysqlConnection;

///////////////////////

module.exports.checkAuth = (token, onSuccess, onFailed, onError) => {
  if( !tokenRegexp.test(token) ) return onError( INCORRECT_QUERY );
  makeQuery(`SELECT user_id FROM sessions WHERE token=?`, [ token ],
  res => {
    if(res.result.length === 1) onSuccess( res.result[0].user_id );
    else onFailed( AUTH_FAILED );
  }, onError);
}

module.exports.validateUser = function(user_id, onSuccess, onFailed, onError){
  makeQuery(`SELECT email_confirm_token, user_data_filled FROM users WHERE user_id=?`, [ user_id ],
    res => {
    if( !res.result.length ) return onError({ status: 'error', text: 'user doesn\'t exist' });

    if( res.result[0].email_confirm_token !== null )
      onFailed({ status: 'error', text: 'email not confirmed', action: {
        text: 'Пожалуйста, подтвердите электронную почту'
      } });
    else if( !res.result[0].user_data_filled )
      onFailed({ status: 'error', text: 'user data doesn\'t filled', action: {
        path: '/acceptTerms',
        text: 'Пожалуйста, заполните данные'
      } });
    else onSuccess();
  }, onError);
}

module.exports.checkAdmin = (user_id, onSuccess, onFailed, onError) => {
  makeQuery(`SELECT role_id FROM users WHERE user_id=?`, [ user_id ],
  res => {
    if( res.result[0].role_id == ADMIN_ROLE ) onSuccess();
    else onFailed( FORBIDDEN );
  }, onError);
}

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
