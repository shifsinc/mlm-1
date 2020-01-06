exports.loginRegexp = /^\w{5,30}$/;
exports.emailRegexp = exports.paypalRegexp = /^.+@[a-zA-Z\-0-9.]+$/;
exports.passwordRegexp = /(?=^.{8,30}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
exports.nameRegexp = /^[\wа-яА-Я]+$/;
exports.phoneRegexp = /^[0-9]{11,15}$/;
exports.linkRegexp = /^https?:\/\/[a-zA-Z\-0-9.]+(\/.*)?$/;
exports.telegramRegexp = /^\w+$/;
exports.ethereumRegexp = /^0x[a-z0-9]{40}$/;

exports.RATES_IMAGES = {
  '1': require('./img/robot_client@2x.png'),
  '2': require('./img/robot_light@2x.png'),
  '3': require('./img/robot_advanced@2x.png'),
  '4': require('./img/robot_master@2x.png')
}
exports.RATES_TITLES = {
  '1': 'CLIENT',
  '2': 'LIGHT',
  '3': 'ADVANCED',
  '4': 'MASTER'
};
exports.RATES_PRICES = {
  '0': 0,
  '1': 250,
  '2': 500,
  '3': 1000,
  '4': 2000
}
exports.STATUS_TITLES = {
  'investor': 'ИНВЕСТОР',
  'bronze': 'БРОНЗА',
  'silver': 'СЕРЕБРО',
  'gold': 'ЗОЛОТО',
  'platinum': 'ПЛАТИНА',
  'sapphire': 'САПФИР',
  'emerald': 'ИЗУМРУД',
  'diamond': 'БРИЛЛИАНТ',
  'diamond2': '2*БРИЛЛИАНТ'
}
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

exports.BINARY_CYCLE_AMOUNT = 250;

exports.EVENTS_TITLES = {
  'payment': 'Пополнение баланса',
  'withdraw': 'Вывод средств',
  'new_status': 'Новый статус',
  'bonus_start': 'Условия стартового бонуса выполнены'
}
