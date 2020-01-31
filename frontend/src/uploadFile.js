import { API_ENDPOINT } from './config.js'

export default (method, token, file, params = {}) => {
  params._file = true;
  params.token = token;
  var paramsArr = [];
  Object.keys(params).map(key => paramsArr.push( key + '=' + params[key] ));
  return fetch(API_ENDPOINT + method + '?' + paramsArr.join('&'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/octet-stream'
      },
      body: file
  })
  .then(r => r.json())
  .catch(r => { return { status: 'error', text: 'Request error', action: { text: 'Ошибка запроса' } } });
}
