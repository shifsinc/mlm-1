const { sendMail } = require('./utils.js');
const { DOMAIN } = require('./config.js');
const template = require('./email-template.js');

exports.sendConfirmMail = function(receiver, token, callback){
  const html = template(`<h2>Пожалуйста, подтвердите ваш адрес электронной почты</h2>
    <a class="link button" target="_blank" href="https://${DOMAIN}/confirmEmail?confirmToken=${token}">Подтвердить</a>`);
  sendMail(receiver, html, callback);
}

exports.sendResetMail = function(receiver, token, callback){
  const html = template(`<h2>Восстановление пароля</h2>
    <a class="link button" target="_blank" href="https://${DOMAIN}/passwordReset?resetToken=${token}">Восстановить</a>`);
  sendMail(receiver, html, callback);
}
