import React from 'react';

import ReferalsTree from '../common/ReferalsTree.js'
import UserCard from '../common/UserCard.js'
import ViewSelect from '../../common/ViewSelect.js'
import { getUserCardInfo } from '../../../utils.js'

export default class extends React.Component {
  constructor(props){/*apiCall*/
    super(props);
    this.state = {
      popup: null,
      cardData: {}
    }
  }
  render(){
    return (<div className="admin__users">
      <ReferalsTree apiCall={ this.props.apiCall } userClick={ this._userClick } userId={ 10 }></ReferalsTree>
      <ViewSelect active={ this.state.popup }>

        <UserCard data={ this.state.cardData }
          onClose={ () => this.setState({ popup: null }) }>
        </UserCard>

      </ViewSelect>
    </div>);
  }

  _userClick = user => {
    getUserCardInfo( this.props.apiCall, user.user_id, d => this.setState({ cardData: d, popup: 0 }) );
  }

}
