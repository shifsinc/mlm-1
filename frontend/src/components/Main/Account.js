import React from 'react';
import './Account.css'

import Info from './Account/Info.js';
import Links from './Account/Links.js';
import News from './Account/News.js';
import Users from './Account/Users.js';

export default function(props) {/*updateLocation*/
  var checkResult = r => r.result ? r.result : [];
  var users = props.apiCall('getUserInfo').then( checkResult ),
    referals = props.apiCall('getReferals', { count: 7 }).then( checkResult ),
    sponsors = props.apiCall('getSponsors', { count: 7 }).then( checkResult ),
    news = props.apiCall('getNews', { offset: 0, count: 10 }).then( checkResult );
  return (
    <div className="main__content account">
      <Info { ...props } dataSrc={ users }></Info>
      <Users { ...props } title="Мои рефералы" dataSrc={ referals }></Users>
      <Links { ...props } dataSrc={ users }></Links>
      <Users { ...props } title="Мои спонсоры" dataSrc={ sponsors }></Users>
      <News { ...props } dataSrc={ news }></News>
      <div style={{ clear: 'both' }}></div>
    </div>
  );
}
