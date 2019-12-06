export default function(data){
  return Promise.reject({ message: 'ERR!11', fields: ['email'] });
}
