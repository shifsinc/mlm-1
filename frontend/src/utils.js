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
