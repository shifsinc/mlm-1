exports.loginRegexp = /^[a-zA-Z][a-zA-Z_0-9]{4,29}$/;
exports.emailRegexp = exports.paypalRegexp = /^(.+@[a-zA-Z\-0-9.]+){1,45}$/;
exports.passwordRegexp = /(?=^.{8,30}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
exports.nameRegexp = /^[\wа-яА-Я]{1,40}$/;
exports.phoneRegexp = /^[0-9]{11,15}$/;
exports.linkRegexp = /^https?:\/\/[a-zA-Z\-0-9.]+(\/.*)?$/;
exports.telegramRegexp = /^\w{1,64}$/;
exports.ethereumRegexp = /^0x[a-z0-9]{40}$/;
exports.robotKeyRegexp = /^[0-9]{1,32}$/;

exports.RATES_COUNT = 4;
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
  'out': 'ВЫВОД СРЕДСТВ',
  'bonus_linear': 'ЛИНЕЙНЫЙ БОНУС',
  'bonus_binary': 'БИНАРНЫЙ БОНУС',
  'bonus_match': 'MATCH-БОНУС',
  'bonus_lead': 'ЛИДЕРСКИЙ БОНУС',
  'bonus_extra': 'ЭКСТРА БОНУС'
}
exports.PAY_METHOD_TITLES = {
  'ethereum': 'ETH',
  'paypal': 'USD'
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

exports.ROBOT_SALE_TIME = 15778476000;//6 months

exports.PAY_METHOD_ETH = 0;
exports.PAY_METHOD_PAYPAL = 1;

exports.PAGES_HINTS = {
  '/account': `Раздел содержит Вашу личную контактную информацию,
уровень вашего аккаунта в системе YodaFX, данные по балансу и доходу,
партнерские ссылки и раздел актуальных новостей`,
  '/robot': `Раздел содержит информацию о подключенных торговых счетах,
информацию об обновлениях и файл с самой новой версией робота,
раздел с возможностью обновления робота до лицензии Master`,
  '/team': 'Раздел содержит все данные и показатели привлеченных Вами пользователей',
  '/marketing': `Раздел содержит актуальные материалы для презентаций, вебинаров
и работы в социальных сетях`,
  '/finances': `Раздел содержит Ваш текущий баланс во внутренней валюте проекта - YT,
раздел с персональными показателями и бонусами.
Есть возможность пополнить баланс и перевести средства`,
  '/instructions': 'Видеоинструкции и статьи с ответами на базовые и часто задаваемые вопросы',
  '/blog': 'Актуальные новости проекта YodaFX',
  '/settings': 'Настройки аккаунта',
  '/admin': 'Панель админа',
}
