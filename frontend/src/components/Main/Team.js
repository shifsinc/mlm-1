import React from 'react';
import './Team.css'
import Lines from './Team/Lines.js'
import Stats from './Team/Stats.js'
import List from './Team/List.js'
import Input from '../Input.js'
import UsersTree from './Team/ReferalsTree.js'
import PageView from '../PageView.js'

export default class extends React.Component {
  constructor(props){
    super(props);
    this.state = { stats: {} };

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
          <PageView callback={ p => this.props.apiCall('_', p).then(r => r.result ? r.result : []) }
            component={ List } onPageCount={ 5 }></PageView>
        </div>
        <UsersTree apiCall={ this.props.apiCall }></UsersTree>
      </div>
    )
  }
}
