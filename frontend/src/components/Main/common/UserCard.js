import React from 'react';
import './UserCard.css'
import './userStatus.css'

import Popup from '../../common/Popup.js'
import UserInfo from './UserInfo.js'

export default function(props) {/*data, onClose*/
  var data = props.data ? props.data : {};
  return (
    <Popup className={ 'user-card status-' + data.user_status } onClose={ props.onClose }>
      <div className="user-card__cont">
        <div className={ 'user-info__status-img status-' + ( data.user_status + '-avatar' ) }></div>
        <UserInfo data={ props.data }></UserInfo>
      </div>
    </Popup>
  );
}
