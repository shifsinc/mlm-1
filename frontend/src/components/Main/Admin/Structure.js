import React from 'react';
//import './.css'
import ReferalsTree from '../common/ReferalsTree.js'
import UserCard from '../common/UserCard.js'
import { getUserCardInfo } from '../../../utils.js'

export default class extends React.Component {
  constructor(props){/*apiCall*/
    super(props);
    this.state = {
      cardDisplay: false,
      cardData: {}
    }
  }
  render(){
    return (<div className="admin__users">
      <ReferalsTree apiCall={ this.props.apiCall } userClick={ this._userClick } userId={ 10 }></ReferalsTree>
      <UserCard data={ this.state.cardData }
        display={ this.state.cardDisplay }
        onClose={ () => this.setState({ cardDisplay: false }) }></UserCard>
    </div>);
  }

  _userClick = user => {
    getUserCardInfo( this.props.apiCall, user.user_id, d => this.setState({ cardData: d, cardDisplay: true }) );
  }

}
