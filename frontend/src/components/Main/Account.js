import React from 'react';
import './Account.css'

import Info from './Account/Info.js'
import Links from './Account/Links.js'
import News from './common/News.js';
import Users from './Account/Users.js';
import TitleBlock from './common/TitleBlock.js'

export default class extends React.Component {
  constructor(props){/*apiCall*/
    super(props);
    this.state = { info: {}, balance: {}, stats: {}, referals: [], sponsors: [], news: [] }

    props.apiCall('getUserInfo').then( r => this.setState({ info: r.result }) );
    props.apiCall('getUserBalance').then( r => this.setState({ balance: r.result }) );
    props.apiCall('getUserStats').then( r => this.setState({ stats: r.result }) );
    props.apiCall('getReferals', { offset: 0, count: 7 }).then( r => this.setState({ referals:  r.result ? r.result.data : [] }) );
    props.apiCall('getSponsors', { offset: 0, count: 7 }).then( r => this.setState({ sponsors: r.result ? r.result.data : [] }) );
  }

  render(){
    return (<div className="main__content account">

      <Info updateLocation={ this.props.updateLocation } data={{ ...this.state.info,...this.state.balance, ...this.state.stats }}
        userClick={ this._userClick }></Info>

      <Users title="Мои рефералы" data={ this.state.referals } updateLocation={ this.props.updateLocation }
        userClick={ this._userClick }></Users>

      <Links data={ this.state.info } toggleLink={ type => {
        this.props.apiCall('setGeneralLinkType', { type }).then( r => {
          if(r.status === 'ok') this.setState({ info: Object.assign({}, this.state.info, { general_link_type: type }) });
        })
      } }></Links>

      <Users title="Мои спонсоры" data={ this.state.sponsors }
        updateLocation={ this.props.updateLocation }
        userClick={ this._userClick }></Users>

      <TitleBlock title="Новости" className="account__news" >
        <News apiCall={ this.props.apiCall }></News>
      </TitleBlock>

      <div style={{ clear: 'both' }}></div>
    </div>)
  }

  _userClick = user => {
    this.props.showUserCard(user.user_id);
  }
}
