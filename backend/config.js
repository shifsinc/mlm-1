exports.SERVER_HOST = '0.0.0.0';
exports.SERVER_PORT = 8081;

exports.DOMAIN = 'yodafx.pro';

exports.API_PREFIX = '/api';

//exports.PRIVATE_KEY_PATH = '/etc/apache2/server~localhost.key';
exports.PRIVATE_KEY_PATH = '';
//exports.CERT_PATH = '/etc/apache2/server~localhost.pem';
exports.CERT_PATH = '';
exports.SSL = false;

const MYSQL_HOST = 'localhost';
const MYSQL_USER = 'root';
//const MYSQL_USER = 'mlm_dev';
//const MYSQL_USER = 'yodafxpr_mlm';
const MYSQL_PASSWORD = '';
//const MYSQL_PASSWORD = 'Jyv3sod';
//const MYSQL_PASSWORD = 'N&$-lkdG8,n5';
const MYSQL_DATABASE = 'yodafxpr_mlm_db';

exports.MYSQL_AUTH = {
  host: MYSQL_HOST,
  user: MYSQL_USER,
  password: MYSQL_PASSWORD,
  database: MYSQL_DATABASE
}

exports.PHOTOS_PATH = '/Library/WebServer/Documents/photos/';
//exports.PHOTOS_PATH = '/var/www/mlm.dig-studio.ru/www/photos/';
//exports.PHOTOS_PATH = '/home/yodafxpr/public_html/photos/';
exports.PHOTOS_PREFIX = '/photos/';

exports.FILES_PATH = '/Library/WebServer/Documents/files/';
//exports.FILES_PATH = '/var/www/mlm.dig-studio.ru/www/files/';
//exports.FILES_PATH = '/home/yodafxpr/public_html/files/';
exports.FILES_PREFIX = '/files/';

exports.MAIL_HOST = 'mi3-ss46.a2hosting.com';
exports.MAIL_PORT = 465;
exports.MAIL_USER = 'info@yodafx.pro';
exports.MAIL_PASS = '5.mF;!XkO{[?';
