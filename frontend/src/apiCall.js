import { apiEndpoint } from './config.js'

export default (method, token, data = {}) => {
  return fetch(apiEndpoint + method, {
      method: 'POST',
      body: JSON.stringify({ ...data, token })
  })
  .then(r => r.json())
  .catch(r => { return { status: 'error', text: 'Request error', action: { text: 'Ошибка запроса' } } });
}
