export default (method, data = {}) => {
  return fetch('http://mlm.dig-studio.ru:8080/' + method, {
      method: 'POST',
      body: JSON.stringify(data)
  })
  .then(r => r.json())
  .catch(r => {return { status: 'error', text: 'Request error' }});
}
