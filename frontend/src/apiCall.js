export default (method, token, data = {}) => {
  return fetch('http://localhost:8080/' + method, {
  //return fetch('http://mlm.dig-studio.ru:8080/' + method, {
      method: 'POST',
      body: JSON.stringify({ ...data, token })
  })
  .then(r => r.json())
  .catch(r => {return { status: 'error', text: 'Request error' }});
}
