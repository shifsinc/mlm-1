const http = require('http');
const url = require('url');

const { SERVER_HOST, SERVER_PORT } = require('./config.js');

const api = require('./api.js');
const { parseGetParams, initMysqlConnection, makeQuery } = require('./utils.js');
const { INCORRECT_QUERY } = require('./const.js');

function serverHnd(request, response){
		response.setHeader('Access-Control-Allow-Origin', "*");
  response.setHeader('Content-Type', 'text/json');

  var _url = url.parse( request.url ),
    methodPath =  _url.pathname,
    method = api[ request.method ] ? api[ request.method ][ methodPath ] : undefined;

  console.log('request: ', methodPath);
  if( !method ) return response.end( JSON.stringify({ status: 'error', text: 'method doesn\'t exist' }) );

  if(request.method == 'GET'){
    method( resp => response.end( JSON.stringify(resp) ), parseGetParams( _url.query ) );
  } else if(request.method == 'POST'){
    var jsonStr = '', params;
    request.on('data', d => jsonStr += d);
    request.on('end', () => {
      try{
        params = JSON.parse( jsonStr );
      } catch(e){
        return response.end( JSON.stringify( INCORRECT_QUERY ) );
      }
      method( resp => response.end( JSON.stringify(resp) ), params );
    });
  }
}
initMysqlConnection(() => {
	const server = http.createServer( serverHnd );
	server.listen( SERVER_PORT, SERVER_HOST, () => console.log('server started on ' + SERVER_HOST + ':' + SERVER_PORT) );
}, err => console.log(err));
