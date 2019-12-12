import React from 'react';
import './Account.css'

import Info from './Account/Info.js';
import Links from './Account/Links.js';
import News from './Account/News.js';
import Referals from './Account/Referals.js';
import Sponsors from './Account/Sponsors.js';

export default function(props) {/*updateLocation*/
  return (
    <div className="account">
      <Info { ...props }></Info>
      <Links { ...props }></Links>
      <News { ...props }></News>
      <Referals { ...props }></Referals>
      <Sponsors { ...props }></Sponsors>
    </div>
  );
}
