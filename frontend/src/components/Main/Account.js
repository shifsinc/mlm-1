import React from 'react';
import './Account.css'

import Info from './Account/Info.js'
import Links from './Account/Links.js'
import News from './Account/News.js';
import Users from './Account/Users.js';
import PageView from '../PageView.js'
import TitleBlock from './common/TitleBlock.js'

export default class extends React.Component {
  constructor(props){/*apiCall*/
    super(props);
    this.state = { info: {}, balance: {}, stats: {}, referals: [], sponsors: [], news: [] }

    props.apiCall('getUserInfo').then( r => this.setState({ info: r.result }) );
    props.apiCall('getUserBalance').then( r => this.setState({ balance: r.result }) );
    props.apiCall('getUserStats').then( r => this.setState({ stats: r.result }) );
    props.apiCall('getReferals', { offset: 0, count: 7 }).then( r => this.setState({ referals: r.result.data }) );
    props.apiCall('getSponsors', { offset: 0, count: 7 }).then( r => this.setState({ sponsors: r.result.data }) );
  }

  render(){
    return (<div className="main__content account">
      <Info data={{ ...this.state.info,...this.state.balance, ...this.state.stats }}></Info>
      <Users title="Мои рефералы" data={ this.state.referals }></Users>
      <Links data={ this.state.info }></Links>
      <Users title="Мои спонсоры" data={ this.state.sponsors }></Users>
      <TitleBlock title="Новости" className="account__news" >
        <PageView callback={ p => this.props.apiCall('getNews', p).then(r => r.result ? r.result : {}) }
          component={ News }  onPageCount={ 5 }></PageView>
      </TitleBlock>
      <div style={{ clear: 'both' }}></div>
    </div>)
  }
}
