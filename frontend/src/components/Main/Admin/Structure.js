import React from 'react';
import './Structure.css'

import ReferalsTree from '../common/ReferalsTree.js'
import UserCard from '../common/UserCard.js'
import ViewSelect from '../../common/ViewSelect.js'
import Input from '../../common/Input.js'
import { getUserCardInfo } from '../../../utils.js'

export default class extends React.Component {
  constructor(props){/*apiCall*/
    super(props);
    this.state = {
      popup: null,
      cardData: {},
      user_id: null,
      search: ''
    }
  }
  render(){
    return (<div className="admin__structure interface-block admin__first-block">
      <Input label="Поиск пользователей" attr={{ value: this.state.search, onChange: e => {
        this.setState({ search: e.target.value });
      } }}>
        <div className="admin__structure__search" onClick={ () => {
          var user_id = parseInt( this.state.search );
          if( !isNaN(user_id) ) this.setState({ user_id: this.state.search });
        }}></div>
      </Input>
      <ReferalsTree apiCall={ this.props.apiCall } userClick={ this._userClick } userId={ this.state.user_id }></ReferalsTree>
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
