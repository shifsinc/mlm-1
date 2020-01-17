import React from 'react';
import './Structure.css'

import ReferalsTree from '../common/ReferalsTree.js'
import Input from '../../common/Input.js'

export default class extends React.Component {
  constructor(props){/*apiCall*/
    super(props);
    this.state = {
      user_id: null,
      search: ''
    }
  }
  render(){
    return (<div className="admin__structure interface-block admin__first-block">
      <Input label="Поиск пользователей" attr={{ value: this.state.search, onChange: e => {
        this.setState({ search: e.target.value });
      } }}>
        <div className="admin__structure__search input__button" onClick={ () => {
          var user_id = parseInt( this.state.search );
          if( !isNaN(user_id) ) this.setState({ user_id: this.state.search });
        }}></div>
      </Input>
      <ReferalsTree apiCall={ this.props.apiCall } userClick={ this._userClick } userId={ this.state.user_id }></ReferalsTree>
    </div>);
  }

  _userClick = user => {
    this.props.showUserCard(user.user_id);
  }

}
