exports.INCORRECT_QUERY = { status: 'error', text: 'incorrect query', action: { text: 'Ошибка запроса' } }
exports.AUTH_FAILED = { status: 'error', text: 'auth failed', action: {} }
exports.OK = { status: 'ok', action: { text: 'OK' } }
exports.FORBIDDEN = { status: 'error', text: 'forbidden', action: { text: 'Forbidden' }}
exports.USER_NOT_EXISTS = { status: 'error', text: 'user not exists', action: { text: 'Пользователь не существует' }}

exports.loginRegexp = /^\w{5,30}$/;
exports.emailRegexp = exports.paypalRegexp = /^.+@[a-zA-Z\-0-9\.]+$/;
exports.passwordRegexp = /(?=^.{8,30}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
exports.nameRegexp = /^[\wа-яА-Я]+$/;
exports.phoneRegexp = /^[0-9]{11,15}$/;
exports.linkRegexp = /^https?:\/\/[a-zA-Z\-0-9\.]+(\/.*)?$/;
exports.telegramRegexp = /^\w+$/;
exports.tokenRegexp = /^[a-z0-9]{32}$/;
exports.ethereumRegexp = /^0x[a-z0-9]{40}$/;
exports.filenameRegexp = /^[a-z0-9]{32}$/;

exports.PASSWORD_RESET_TOKEN_VALID_TIME = 24*60*60*1000//ms
exports.INCORRECT_TOKEN = { status: 'error', text: 'token invalid', action: { text: 'Ссылка недействительна' } };

exports.ADMIN_ROLE = 1;
exports.USER_ROLE = 2;

exports.PAY_METHOD_PAYPAL = 0;
exports.PAY_METHOD_ETH = 1;
exports.PAY_COMMISSION = 1.02;

exports.MAX_DEPOSITS = {
  'client': 250,
  'light': 500,
  'advanced': 1000,
  'master': 2000
}
exports.WITHDRAW_COMMISSION = 0.02;
