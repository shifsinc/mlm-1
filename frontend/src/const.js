exports.loginRegexp = /^\w{5,30}$/;
exports.emailRegexp = exports.paypalRegexp = /^.+@[a-zA-Z\-0-9.]+$/;
exports.passwordRegexp = /(?=^.{8,30}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
exports.nameRegexp = /^[\wа-яА-Я]+$/;
exports.phoneRegexp = /^[0-9]{11,15}$/;
exports.linkRegexp = /^https?:\/\/[a-zA-Z\-0-9.]+(\/.*)?$/;
exports.telegramRegexp = /^\w+$/;
exports.ethereumRegexp = /^0x[a-z0-9]{40}$/;

exports.RATES = {
  'client': require('./img/robot_client@2x.png'),
  'light': require('./img/robot_light@2x.png'),
  'advanced': require('./img/robot_advanced@2x.png'),
  'master': require('./img/robot_master@2x.png')
}
exports.RATES_PRICE = {
  'client': 250,
  'light': 500,
  'advanced': 1000,
  'master': 2000
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
exports.TRANSACTION_STATUS = {
  'wait': {
    title: 'Ожидается перевод',
    icon: ''
  },
  'ok': {
    title: 'Перевод совершен',
    icon: ''
  },
  'rejected': {
    title: 'Транзакция отклонена',
    icon: ''
  }
}
exports.WITHDRAW_COMMISSION = 0.02;

exports.BINARY_CYCLE_AMOUNT = 250;
