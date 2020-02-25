exports.INCORRECT_QUERY = { status: 'error', text: 'incorrect query', action: { text: 'Ошибка запроса' } }
exports.AUTH_FAILED = { status: 'error', text: 'auth failed', action: {} }
exports.OK = { status: 'ok', action: { text: 'OK' } }
exports.FORBIDDEN = { status: 'error', text: 'forbidden', action: { text: 'Forbidden' }}
exports.USER_NOT_EXISTS = { status: 'error', text: 'user not exists', action: { text: 'Пользователь не существует' }}
exports.FILE_NOT_EXISTS = { status: 'error', text: 'file not exists', action: { text: 'Файл не существует' }}
exports.NOT_ENOUGH_MONEY = { status: 'error', text: 'not enough money', action: { text: 'Недостаточно средств' }}
exports.TRANSACTION_NOT_EXISTS = { status: 'error', text: 'transaction not exists', action: { text: 'Транзакция не существует' }}
exports.INCORRECT_FILE = { status: 'error', text: 'incorrect file', action: { text: 'Неверный тип файла' } }
exports.DATA_NOT_UNIQUE = { status: 'error', text: 'data not unique', action: { text: 'Данные не уникальны' } }
exports.NO_DATA_PAGES = { status: 'ok', result: { count: 0, data: [] } }
exports.INCORRECT_CAPTCHA = { status: 'error', text: 'incorrect captcha', action: { text: 'Captcha error' } }
exports.NO_PAYMENT_INFO = { status: 'error', text: 'no payment info', action: { text: 'Платежные данные не заполнены' } }
exports.INTERNAL_ERROR = { status: 'error', text: 'internal error', action: { text: 'Внутренняя ошибка' } }

exports.NO_PHOTO = 'noPhoto.png';

exports.loginRegexp = /^[a-zA-Z][a-zA-Z_0-9]{4,29}$/;
exports.emailRegexp = exports.paypalRegexp = /^.+@[a-zA-Z\-0-9\.]+$/;
exports.passwordRegexp = /(?=^.{8,30}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
exports.nameRegexp = /^[\wа-яА-Я]{1,40}$/;
exports.phoneRegexp = /^[0-9]{11,15}$/;
exports.linkRegexp = /^https?:\/\/[a-zA-Z\-0-9\.]+(\/.*)?$/;
exports.socialRegexp = /^[\w]{1,50}$/;
exports.telegramRegexp = /^\w{1,64}$/;
exports.tokenRegexp = /^[a-z0-9]{40}$/;
exports.ethereumRegexp = /^0x[a-z0-9]{35,50}$/;
exports.filenameRegexp = /^[^/\\]+$/;
exports.robotKeyRegexp = /^[0-9]{1,32}$/;

exports.PASSWORD_RESET_TOKEN_VALID_TIME = 24*60*60*1000//ms
exports.PASSWORD_RESET_TIMEOUT = 3 * 24*60*60*1000//ms
exports.INCORRECT_TOKEN = { status: 'error', text: 'token invalid', action: { text: 'Ссылка недействительна' } };

exports.ADMIN_ROLE = 1;
exports.USER_ROLE = 2;

exports.PAY_METHOD_ETH = 0;
exports.PAY_METHOD_PAYPAL = 1;
exports.PAY_COMMISSION = 1.02;

exports.MAX_DEPOSITS = {
  '1': 2000,
  '2': 5000,
  '3': 15000,
  '4': 50000
}
exports.RATES_PRICES = {
  '1': 250,
  '2': 500,
  '3': 1000,
  '4': 2000
}
exports.WITHDRAW_COMMISSION = 0.02;
exports.MIN_WITHDRAW_AMOUNT = 10;

exports.TRANSACTION_TIMEOUT = 24*60*60;//sec

exports.ROBOT_LICENSE_VALID = 12;//months
exports.ROBOT_SALE_TIME = 15778476000;//6 months

exports.BINARY_CYCLE_AMOUNT = 250;

exports.LINEAR_BONUS_VALUES = {
  'client': {
    '1': 0.1,
    '2': 0
  },
  'light': {
    '1': 0.1,
    '2': 0.02
  },
  'advanced': {
    '1': 0.13,
    '2': 0.04
  },
  'master': {
    '1': 0.16,
    '2': 0.05
  }
}
exports.BINARY_BONUS_VALUES = {
  'client': 0.03,
  'light': 0.1,
  'advanced': 0.11,
  'master': 0.11
}
exports.MATCH_BONUS_LEVELS = {
  'investor': 0,
  'bronze': 0,
  'silver': 1,
  'gold': 2,
  'platinum': 3,
  'sapphire': 4,
  'emerald': 5,
  'diamond': 5,
  'diamond2': 5
}
exports.MATCH_BONUS_VALUES = {
  'client': 0,
  'light': 0.05,
  'advanced': 0.08,
  'master': 0.1
}
exports.LEAD_BONUS_VALUE = 0.02;
exports.START_BONUS_TIME = 30 * 24 * 60 * 60 * 1000;
exports.START_BONUS_VALUES = {
  'client': NaN,
  'light': 2500,
  'advanced': 3000,
  'master': 3500
}
exports.EXTRA_BONUS_TIME = 30 * 24 * 60 * 60 * 1000;
exports.EXTRA_BONUS_REV = 5000;
exports.EXTRA_BONUS_AMOUNT = 500;
