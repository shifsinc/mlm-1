const { sendMail } = require('./utils.js');
const { DOMAIN } = require('./config.js');

exports.sendConfirmMail = function(receiver, token, callback){
  sendMail(receiver, 'Please, confirm your email address https://' + DOMAIN + '/confirmEmail?confirmToken' + token, callback);
}

exports.sendResetMail = function(receiver, token, callback){
  sendMail(receiver, 'Reset password https://' + DOMAIN + '/passwordReset?resetToken=' + token, callback);
}
