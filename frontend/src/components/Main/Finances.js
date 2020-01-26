import React from 'react';
import './Finances.css'
import Balance from './Finances/Balance.js'
import Bonuses from './Finances/Bonuses.js'
import WithdrawMoney from './Finances/WithdrawMoney.js'
import History from './Finances/History.js'
import PageView from '../common/PageView.js'
import TitleBlock from './common/TitleBlock.js'

export default class extends React.Component {
  constructor(props){/*apiCall*/
    super(props);
    this.state = { balance: {}, bonuses: {} };

    props.apiCall('getUserBalance').then( r => this.setState({ balance: r.result }) );
    props.apiCall('getBilling').then( r => this.setState({ billing: r.result }) );
    props.apiCall('getUserBonuses').then( r => this.setState({ bonuses: r.result }) );
  }

  render(){
    return (<div className="main__content finances">
      <div className="finances__cont">
        <Balance data={ this.state.balance }
          refillClick={ () => this.props.updateLocation('/refill') }
          transferClick={ () => this.props.updateLocation('/transfer') }></Balance>

        <Bonuses data={{ ...this.state.bonuses, ...this.state.balance }}></Bonuses>
      </div>

      <WithdrawMoney apiCall={ this.props.apiCall } data={{ ...this.state.balance, ...this.state.billing }}
        onWithdraw={ amount => this.setState({
          balance: { ...this.state.balance, account_balance: this.state.balance.account_balance - amount },
          rand: Math.random() })
        }></WithdrawMoney>

      <TitleBlock title="История операций" className="finances__history">
        <PageView callback={ p => this.props.apiCall('getTransactions', p) }
          callbackArgs={{ rand: this.state.rand }}
          component={ History } componentProps={{ userClick: this._userClick }} onPageCount={ 5 }></PageView>
      </TitleBlock>
    </div>);
  }

  _userClick = user_id => {
    this.props.showUserCard(user_id);
  }
}
