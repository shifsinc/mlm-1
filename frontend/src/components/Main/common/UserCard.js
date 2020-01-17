import React from 'react';
import './UserCard.css'
import './userStatus.css'

import Popup from '../../common/Popup.js'
import UserInfo from './UserInfo.js'
import { getUserCardInfo } from '../../../utils.js'

export default class extends React.Component {
  constructor(props) {/*data, onClose, apiCall*/
    super(props);
    this.state = {
      data: props.data ? props.data : {}
    }
  }
  render(){
    var data = this.state.data;
    return (<Popup className={ 'user-card status-' + data.user_status } onClose={ this.props.onClose }>
        <div className="user-card__cont no-scrollbar">
          <div className={ 'user-card__status-img status-' + ( data.user_status + '-avatar' ) }></div>
          <UserInfo data={ this.state.data } userClick={ this._userClick }></UserInfo>
        </div>
      </Popup>);
  }

  _userClick = user_id => {
    getUserCardInfo(this.props.apiCall, user_id, data => this.setState({ data }));
  }

}
