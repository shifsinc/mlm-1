const http = require('http'),
	https = require('https'),
  fs = require("fs"),
	url = require('url');

const {
	SERVER_HOST,
	SERVER_PORT,
	SSL,
	PRIVATE_KEY_PATH,
	CERT_PATH
} = require('./config.js');

const api = require('./api.js');
const { parseGetParams, initMysqlConnection, makeQuery } = require('./utils.js');
const { INCORRECT_QUERY } = require('./const.js');

function serverHnd(request, response){
		response.setHeader('Access-Control-Allow-Origin', '*');
		response.setHeader('Access-Control-Allow-Headers', '*');
  response.setHeader('Content-Type', 'text/json');
	request.on('error', console.log);

  var _url = url.parse( request.url ),
    methodPath =  _url.pathname,
    method = api[ request.method ] ? api[ request.method ][ methodPath ] : undefined;

  console.log('request: ', methodPath);
  if( !method ) return response.end( JSON.stringify({ status: 'error', text: 'method doesn\'t exist' }) );

  if(request.method === 'GET'){
    method( resp => response.end( JSON.stringify(resp) ), parseGetParams( _url.query ) );
  } else if( request.method === 'POST' ){
		var body = [], params, getParams = parseGetParams( _url.query );
    request.on('data', d => body.push(d));
    request.on('end', () => {
			if( getParams._file ){
				params = getParams;
				params._file = Buffer.concat( body );
			} else {
      	try{
        	params = JSON.parse( body );
      	} catch(e){
        	return response.end( JSON.stringify( INCORRECT_QUERY ) );
      	}
			}
      method( resp => response.end( JSON.stringify(resp) ), params );
    });
  }
}

initMysqlConnection(() => {
	var server;
	const onError = (err, socket) => {
		console.log(err);
		socket.destroy();
	}
	if( SSL ){
		const httpsOptions = {
		  key: fs.readFileSync( PRIVATE_KEY_PATH ),
		  cert: fs.readFileSync( CERT_PATH )
		};
		server = https.createServer( httpsOptions, serverHnd );
		server.on('clientError', onError);
	} else {
		server = http.createServer( serverHnd );
		server.on('tlsClientError', onError);
	}
	server.on('error', console.log);
	server.listen( SERVER_PORT, SERVER_HOST,
		() => console.log('server started on ' + SERVER_HOST + ':' + SERVER_PORT + '[HTTP' + ( SSL ? 'S' : '' ) + ']') );
}, console.log);
