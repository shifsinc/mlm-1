import React from 'react';
import './Finances.css'
import Balance from './Finances/Balance.js'
import Bonuses from './Finances/Bonuses.js'
import OutMoney from './Finances/OutMoney.js'
import History from './Finances/History.js'
import PageView from '../PageView.js'
import TitleBlock from './common/TitleBlock.js'

export default class extends React.Component {
  constructor(props){/*apiCall*/
    super(props);
    this.state = { balance: {}, bonuses: {} };

    props.apiCall('getUserBalance').then( r => this.setState({ balance: r.result }) );
    props.apiCall('getUserBonuses').then( r => this.setState({ bonuses: r.result }) );
  }

  render(){
    return (
      <div className="main__content finances">
        <div className="finances__cont">
          <Balance data={ this.state.balance }></Balance>
          <Bonuses data={ this.state.bonuses }></Bonuses>
        </div>
        <OutMoney></OutMoney>
        <TitleBlock title="История операций" className="finances__history">
          <PageView callback={ p => this.props.apiCall('getTransactions', p).then(r => r.result ? r.result : {}) }
            component={ History } onPageCount={ 5 }></PageView>
        </TitleBlock>
      </div>
    );
  }
}
