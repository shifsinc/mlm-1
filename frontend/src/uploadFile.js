import { API_ENDPOINT } from './config.js'

export default (method, token, file) => {
  return file.arrayBuffer().then(buf => {
    return fetch(API_ENDPOINT + method + '?_file=true&token=' + token, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/octet-stream'
        },
        body: buf
    })
    .then(r => r.json())
    .catch(r => { return { status: 'error', text: 'Request error', action: { text: 'Ошибка запроса' } } });
  });
}
