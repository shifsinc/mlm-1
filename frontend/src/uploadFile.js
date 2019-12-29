import { API_ENDPOINT } from './config.js'

export default (method, token, file) => {
  return file.text().then(t => {
    return fetch(API_ENDPOINT + method + '?_file=true&token=' + token, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/octet-stream'
        },
        body: t
    })
    .then(r => r.json())
    .catch(r => { return { status: 'error', text: 'Request error', action: { text: 'Ошибка запроса' } } });
    /*var resolve;
    var xhr = new XMLHttpRequest();
    xhr.open('POST', API_ENDPOINT + method + '?_file=true&token=' + token);
    xhr.setRequestHeader('Content-Type', 'application/octet-stream');
    xhr.onload = r => {
      resolve( JSON.parse(r.responseText) );
    }
    xhr.onerror = e => {console.log(e)
      resolve({ status: 'error', text: 'Request error', action: { text: 'Ошибка запроса' } });
    }
    xhr.send(t);
    return new Promise(res => resolve = res);*/
  });
}
