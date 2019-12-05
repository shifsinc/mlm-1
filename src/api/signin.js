export default function(data){
  return Promise.reject({ message: 'Логин или пароль введены неправильно!', fields: ['password'] });
}
