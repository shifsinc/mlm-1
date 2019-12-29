import { API_ENDPOINT } from './config.js'

export default (method, token, data = {}) => {
  console.log(method,data)
  return fetch(API_ENDPOINT + method, {
      method: 'POST',
      body: JSON.stringify({ ...data, token })
  })
  .then(r => r.json())
  .catch(r => { return { status: 'error', text: 'Request error', action: { text: 'Ошибка запроса' } } });
}
