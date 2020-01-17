import React from 'react';
import './Team.css'

import Input from '../common/Input.js'
import PageView from '../common/PageView.js'

import Lines from './Team/Lines.js'
import Stats from './Team/Stats.js'
import List from './Team/List.js'

import ReferalsTree from './common/ReferalsTree.js'

export default class extends React.Component {
  constructor(props){/*apiCall*/
    super(props);
    this.state = {
      stats: {},
      pattern: '',
      selectedLine: null
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

            <Lines data={ this.state.stats } lineClick={ this._lineClick } active={ this.state.selectedLine }></Lines>

          </div>

          <Stats data={ this.state.stats }></Stats>

        </div>
        <div className="interface-block team__list">

          <PageView component={ List } componentProps={{ userClick: this._userClick, updateLocation: this.props.updateLocation }}
            onPageCount={ 5 }
            callback={ p => this.props.apiCall('getReferals', p) }
            callbackArgs={{ pattern: this.state.pattern, line: this.state.selectedLine }}></PageView>

        </div>

        <ReferalsTree apiCall={ this.props.apiCall } updateLocation={ this.props.updateLocation }
          userClick={ this._userClick } userId={ this.props.params.user_id }></ReferalsTree>

      </div>
    )
  }

  _userClick = user => {
    this.props.showUserCard(user.user_id);
  }

  _lineClick = n => {
    var selectedLine = n;
    if( this.state.selectedLine === n ) selectedLine = null;
    this.setState({ selectedLine });
  }
}
