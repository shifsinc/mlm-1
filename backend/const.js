exports.INCORRECT_QUERY = { status: 'error', text: 'incorrect query', action: {} }
exports.AUTH_FAILED = { status: 'error', text: 'auth failed', action: {} }
exports.OK = { status: 'ok', action: { text: 'OK' } }
exports.FORBIDDEN = { status: 'error', text: 'forbidden' }

exports.loginRegexp = /^\w{5,30}$/;
exports.emailRegexp = /^.+@[a-zA-Z\-0-9\.]+$/;
exports.passwordRegexp = /(?=^.{8,30}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
exports.nameRegexp = /^[\wа-яА-Я]+$/;
exports.phoneRegexp = /^[0-9]{11,15}$/;
exports.linkRegexp = /^https?:\/\/[a-zA-Z\-0-9\.]+(\/.*)?$/;
exports.telegramRegexp = /^\w+$/;
exports.tokenRegexp = /^[a-z0-9]{32}$/;

exports.PASSWORD_RESET_TOKEN_VALID = 24*60*60*1000//ms

exports.ADMIN_ROLE = 2;
exports.USER_ROLE = 1;
