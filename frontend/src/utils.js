module.exports.formatDate = (str, time = true) => {
  var dt = new Date(str), dateStr = '', timeStr = '';
  if( dt == 'Invalid Date' ) return '';
  var date = dt.getDate() + '',
    month = dt.getMonth() + 1 + '',
    year = dt.getYear() + 1900 + '';
  if( date.length === 1 ) date = '0' + date;
  if( month.length === 1 ) month = '0' + month;
  dateStr = date + '.' + month + '.' + year;

  if( time ){
    var hours = dt.getHours() + '',
      minutes = dt.getMinutes() + '';
    if( hours.length === 1 ) hours = '0' + hours;
    if( minutes.length === 1 ) minutes = '0' + minutes;
    timeStr = ' ' + hours + ':' + minutes;
  }
  return  dateStr + timeStr;
}

module.exports.getUserCardInfo = (apiCall, user_id, callback) => {
  Promise.all([
    apiCall('getUserInfo', { user_id }),
    apiCall('getUserStats', { user_id }),
    apiCall('getUserBalance', { user_id }),
    apiCall('getUserBonuses', { user_id })
    ]).then(r => {
      if( r[0].status === 'error' || r[1].status === 'error' || r[2].status === 'error' || r[3].status === 'error') return;
      callback( Object.assign({}, r[0].result, r[1].result, r[2].result, r[3].result) );
  });
}

module.exports.alignPhoto = ({ target }) => {
  var width = target.clientWidth, height = target.clientHeight,
  contWidth = target.parentElement.clientWidth, contHeight = target.parentElement.clientHeight;

  var t;
  if( contWidth / contHeight < width / height ){
    target.style.height = '100%';
    target.style.width = 'auto';
    t = ( contHeight / height ) * width;
    target.style.marginLeft = ( -( t - contWidth ) / 2 ) + 'px';
    target.style.marginTop = '0';
  } else {
    target.style.width = '100%';
    target.style.height = 'auto';
    t = ( contWidth / width ) * height;
    target.style.marginTop = ( -( t - contHeight ) / 2 ) + 'px';
    target.style.marginLeft = '0';
  }
  target.classList.add('aligned');
}

const { RECAPTCHAV3_PUBLIC_KEY } = require('./config.js');
module.exports.addCaptchaScript = (version, onload) => {
  var captcha = window.document.createElement('script');
  if( version === 2 ){
    captcha.src = 'https://www.google.com/recaptcha/api.js';
    captcha.setAttribute('async', true);
    captcha.setAttribute('defer', true);
  } else if( version === 3 ){
    captcha.src = 'https://www.google.com/recaptcha/api.js?render=' + RECAPTCHAV3_PUBLIC_KEY;
  }
  captcha.onload = onload;
  window.document.head.appendChild(captcha);
}
