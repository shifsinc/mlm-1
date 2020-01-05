import React from 'react';
import './Team.css'

import Input from '../common/Input.js'
import PageView from '../common/PageView.js'

import Lines from './Team/Lines.js'
import Stats from './Team/Stats.js'
import List from './Team/List.js'

import ReferalsTree from './common/ReferalsTree.js'
import UserCard from './common/UserCard.js'
import ViewSelect from '../common/ViewSelect.js'
import { getUserCardInfo } from '../../utils.js'

export default class extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      stats: {},
      cardData: {},
      popup: null,
      pattern: ''
     };

    props.apiCall('getUserStats').then( r => this.setState({ stats: r.result }) );
  }

  render(){
    return (
      <div className="main__content team">
        <div className="team__flex-cont">
          <div className="team__cont">

            <div className="interface-block search-input">
              <Input label="Поиск..." attr={{
                  value: this.state.pattern,
                  onChange: e => this.setState({ pattern: e.target.value })
                }}></Input>
            </div>

            <Lines data={ this.state.stats }></Lines>

          </div>

          <Stats data={ this.state.stats }></Stats>

        </div>
        <div className="interface-block team__list">

          <PageView component={ List } componentProps={{ userClick: this._userClick }} onPageCount={ 5 }
            callback={ p => this.props.apiCall('getReferals', p).then(r => r.result ? r.result : []) }
            callbackArgs={{ pattern: this.state.pattern }}></PageView>

        </div>

        <ReferalsTree apiCall={ this.props.apiCall } userClick={ this._userClick }></ReferalsTree>

        <ViewSelect active={ this.state.popup }>

          <UserCard data={ this.state.cardData }
            onClose={ () => this.setState({ popup: null }) }>
          </UserCard>

        </ViewSelect>

      </div>
    )
  }

  _userClick = user => {
    getUserCardInfo( this.props.apiCall, user.user_id, d => this.setState({ cardData: d, popup: 0 }) );
  }
}
