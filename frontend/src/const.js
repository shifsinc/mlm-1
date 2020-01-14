exports.loginRegexp = /^\w{5,30}$/;
exports.emailRegexp = exports.paypalRegexp = /^.+@[a-zA-Z\-0-9.]+$/;
exports.passwordRegexp = /(?=^.{8,30}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
exports.nameRegexp = /^[\wа-яА-Я]+$/;
exports.phoneRegexp = /^[0-9]{11,15}$/;
exports.linkRegexp = /^https?:\/\/[a-zA-Z\-0-9.]+(\/.*)?$/;
exports.telegramRegexp = /^\w+$/;
exports.ethereumRegexp = /^0x[a-z0-9]{40}$/;

exports.RATES_IMAGES = [
  './img/noPhoto@2x.png',
  require('./img/robot_client@2x.png'),
  require('./img/robot_light@2x.png'),
  require('./img/robot_advanced@2x.png'),
  require('./img/robot_master@2x.png')
]
exports.RATES_TITLES = [
  '',
  'CLIENT',
  'LIGHT',
  'ADVANCED',
  'MASTER'
];
exports.RATES_PRICES = [
  0,
  250,
  500,
  1000,
  2000
]
exports.STATUS_TITLES = [
  '',
  'ШТУРМОВИК',
  'R2D2',
  'С3РО',
  'ЧУБАККА',
  'ХАН СОЛО',
  'ОБИ ВАН КЕНОБИ',
  'ЛЮК СКАЙОКЕР',
  'ДАРТ ВЕЙДЕР',
  'МАГИСТР ЙОДА'
]
exports.TRANSACTION_STATUS_TITLES = {
  'wait': 'Ожидается перевод',
  'ok': 'Перевод совершен',
  'rejected': 'Транзакция отклонена'
}
exports.TRANSACTION_TITLES = {
  'internal': 'ВНУТРЕННИЙ ПЕРЕВОД',
  'in': 'ПОПОЛНЕНИЕ БАЛАНСА',
  'out': 'ВЫВОД СРЕДСТВ'
}
exports.WITHDRAW_COMMISSION = 0.02;
exports.MIN_WITHDRAW_AMOUNT = 10;

exports.BINARY_CYCLE_AMOUNT = 250;

exports.EVENTS_TITLES = {
  'payment': 'Пополнение баланса',
  'withdraw': 'Вывод средств',
  'new_status': 'Новый статус',
  'bonus_start': 'Условия стартового бонуса выполнены'
}
