exports.loginRegexp = /^\w{5,30}$/;
exports.emailRegexp = /^.+@[a-zA-Z\-0-9.]+$/;
exports.passwordRegexp = /(?=^.{8,30}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
exports.nameRegexp = /^[\wа-яА-Я]+$/;
exports.phoneRegexp = /^[0-9]{11,15}$/;
exports.linkRegexp = /^https?:\/\/[a-zA-Z\-0-9.]+(\/.*)?$/;
exports.telegramRegexp = /^\w+$/;
