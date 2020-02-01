const mysql = require('mysql');
const { MYSQL_AUTH, MAIL_HOST, MAIL_PORT, MAIL_USER, MAIL_PASS,
  RECAPTCHAV2_PRIVATE_KEY, RECAPTCHAV3_PRIVATE_KEY } = require('./config.js');
const {
  INCORRECT_QUERY,
  AUTH_FAILED,
  USER_NOT_EXISTS,
  ADMIN_ROLE,
  FORBIDDEN,
  INTERNAL_ERROR,
  tokenRegexp
} = require('./const.js');
const nodemailer = require('nodemailer');
const https = require('https');
const querystring = require('querystring');
const { promisify } = require('util');

var _con, _promiseQuery;
module.exports.initMysqlConnection = function(onSuccess, onError){
  _con = mysql.createConnection( MYSQL_AUTH );
  _promiseQuery = promisify(_con.query).bind(_con);
  _con.connect( err => {
    if(err && onError) onError( INTERNAL_ERROR/*{ status: 'error', text: err.sqlMessage }*/ );
    else onSuccess();
  });
}

function makeQuery(query, params = [], onSuccess, onError){
  if(!_con) return;
  _con.query(query, params, (err, result) => {
    if(err) onError && onError( INTERNAL_ERROR/*{ status: 'error', text: err.sqlMessage}*/ );
    else onSuccess && onSuccess({ status: 'ok', result } );
  });
}
module.exports.makeQuery = makeQuery;

async function makeQueryAsync(query, params = []){
  if(!_promiseQuery) return;
  try {
    var result = await _promiseQuery(query, params);
  } catch(e){
    return INTERNAL_ERROR;//{ status: 'error', text: e.sqlMessage };
  }
  return { status: 'ok', result };
}
module.exports.makeQueryAsync = makeQueryAsync;

module.exports.beginTransaction = function(callback, onError){
  _con.beginTransaction(e => {
    if(e) onError && onError(e);
    else callback( _con );
  });
}

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
  makeQuery(`SELECT email_confirm_token, user_data_filled, user_blocked FROM users WHERE user_id=?`, [ user_id ],
    res => {
    if( !res.result.length ) return onError( USER_NOT_EXISTS );
    res = res.result[0];

    if( res.user_blocked ){
      onFailed({ status: 'error', text: 'user blocked', action: {
        text: 'Пользователь заблокирован'
      } });
    } else if( res.email_confirm_token !== null ){
      onFailed({ status: 'error', text: 'email not confirmed', action: {
        text: 'Пожалуйста, подтвердите электронную почту'
      } });
    } else if( !res.user_data_filled ){
      onFailed({ status: 'error', text: 'user data not filled', action: {
        path: '/acceptTerms',
        text: 'Пожалуйста, заполните данные'
      } });
    } else onSuccess();
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

module.exports.checkUserPwd = function(user_id, pwd, onSuccess, onError){
  makeQuery(`SELECT user_id FROM users WHERE user_id=? AND user_password_hash=SHA(?)`, [ user_id, pwd ],
    res => {
      if( !res.result.length ){
        res = AUTH_FAILED;
        res.action.text = 'Пароль введен неверно';
        if(onError) onError( res );
      } else onSuccess()
    }, onError);
}

///////////////////////

module.exports.getUserAccount = function(user_id, onSuccess, onError){
  makeQuery(`SELECT * FROM accounts WHERE account_owner=?`, [ user_id ],
    res => {
      if( !res.result.length ) onError( USER_NOT_EXISTS );
      else onSuccess( res.result[0] );
    }, onError);
}

//////////////

module.exports.getUserByCode = function(code, onSuccess, onError){
  makeQuery(`SELECT user_id FROM users WHERE user_email=? OR user_phone=?`, [ code, code ],
    res => {
      if( !res.result.length ) onError( USER_NOT_EXISTS );
      else onSuccess( res.result[0] );
    }, onError);
}

/////////////

module.exports.getPersonalRev = function(user_id, callback, onError){
  makeQuery(`SELECT
    SUM(stats_purchase_sum) AS sum
    FROM users_stats
    WHERE user_id IN (SELECT user_id FROM users WHERE user_refer=?)`, [ user_id ],
    res => {
      callback( res.result[0].sum );
    }, onError);
}

/////////////

module.exports.sendMail = function(to, text, callback){
  var tr = nodemailer.createTransport({
    host: MAIL_HOST,
    port: MAIL_PORT,
    secure: true,
    auth: {
      user: MAIL_USER,
      pass: MAIL_PASS
    }
  });
  tr.sendMail({
    from: MAIL_USER,
    to,
    subject: 'YodaFX.PRO',
    html: text
  }, callback);
}

///////////////////

module.exports.checkCaptcha = function(token, version, onSuccess, onFailed){
  if( !token ) return onFailed();
  var query = querystring.stringify({
    secret: version === 2 ? RECAPTCHAV2_PRIVATE_KEY : RECAPTCHAV3_PRIVATE_KEY,
    response: token
  });
  const req = https.request({
    hostname: 'www.google.com',
    path: '/recaptcha/api/siteverify',
    method: 'POST',
      headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Content-Length': Buffer.byteLength(query)
      }
  }, res => {
    var data = '';
    res.on('data', d => data += d);
    res.on('end', () => {
      try{
        var json = JSON.parse(data);
      } catch(e){console.log(e); return}
      if( json.success ) onSuccess();
      else onFailed();
    });
  });
  req.end( query );
}
