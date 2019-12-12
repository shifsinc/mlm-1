import React from 'react';
import './AccountView.css'

export default function(props) {/*updateLocation*/
  return (
    <div id="account-view">
      <div className="account-view__info interface-block"></div>
      <div className="account-view__referals interface-block"></div>
      <div className="account-view__links interface-block"></div>
      <div className="account-view__sponsors interface-block"></div>
      <div className="account-view__news interface-block"></div>
    </div>
  );
}
