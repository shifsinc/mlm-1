import React from 'react';
import './Team.css'
import Lines from './Team/Lines.js'
import Stats from './Team/Stats.js'
import List from './Team/List.js'
import Input from '../common/Input.js'
import UsersTree from './Team/ReferalsTree.js'
import PageView from '../common/PageView.js'
import UserCard from './common/UserCard.js'
import { getUserCardInfo } from '../../utils.js'

export default class extends React.Component {
  constructor(props){
    super(props);
    this.state = { stats: {}, cardData: {}, cardDisplay: false };

    props.apiCall('getUserStats').then( r => this.setState({ stats: r.result }) );
  }

  render(){
    return (
      <div className="main__content team">
        <div className="team__flex-cont">
          <div className="team__cont">
            <div className="interface-block team__search"><Input label="Поиск..."></Input></div>
            <Lines data={ this.state.stats }></Lines>
          </div>
          <Stats data={ this.state.stats }></Stats>
        </div>
        <div className="interface-block team__list">
          <PageView callback={ p => this.props.apiCall('getReferals', p).then(r => r.result ? r.result : []) }
            component={ List } componentProps={{ userClick: this._userClick }} onPageCount={ 5 }></PageView>
        </div>
        <UsersTree apiCall={ this.props.apiCall } userClick={ this._userClick }></UsersTree>

        <UserCard data={ this.state.cardData }
          display={ this.state.cardDisplay }
          onClose={ () => this.setState({ cardDisplay: false }) }
        ></UserCard>
      </div>
    )
  }

  _userClick = user => {
    getUserCardInfo( this.props.apiCall, user.user_id, d => this.setState({ cardData: d, cardDisplay: true }) );
  }
}
