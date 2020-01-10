import React from 'react';
import './Finances.css'
import Balance from './Finances/Balance.js'
import Bonuses from './Finances/Bonuses.js'
import WithdrawMoney from './Finances/WithdrawMoney.js'
import History from './Finances/History.js'
import PageView from '../common/PageView.js'
import TitleBlock from './common/TitleBlock.js'
import AddMoney from './common/AddMoney.js'
import TransferMoney from './common/TransferMoney.js'
import ViewSelect from '../common/ViewSelect.js'

export default class extends React.Component {
  constructor(props){/*apiCall*/
    super(props);
    this.state = { balance: {}, bonuses: {} };

    props.apiCall('getUserBalance').then( r => this.setState({ balance: r.result }) );
    props.apiCall('getUserBonuses').then( r => this.setState({ bonuses: r.result }) );
  }

  render(){
    var active;
    switch( this.props.location ){
      case '/finances':
        active = 0;
        break;
      case '/refill':
        active = 1;
        break;
      case '/transfer':
        active = 2;
        break;
      default: active = null;
    }

    return (
      <div className="main__content finances">
        <ViewSelect active={ active }>
        <><div className="finances__cont">
          <Balance data={ this.state.balance }
            refillClick={ () => this.props.updateLocation('/refill') }
            transferClick={ () => this.props.updateLocation('/transfer') }></Balance>

          <Bonuses data={{ ...this.state.bonuses, ...this.state.balance }}></Bonuses>
        </div>

        <WithdrawMoney apiCall={ this.props.apiCall } data={ this.state.balance }
          onWithdraw={ amount => this.setState({
            balance: { ...this.state.balance, account_balance: this.state.balance.account_balance - amount },
            rand: Math.random() })
          }></WithdrawMoney>

        <TitleBlock title="История операций" className="finances__history">
          <PageView callback={ p => this.props.apiCall('getTransactions', p) }
            callbackArgs={{ rand: this.state.rand }}
            component={ History } onPageCount={ 5 }></PageView>
        </TitleBlock></>

        <AddMoney { ...this.props }></AddMoney>

        <TransferMoney { ...this.props }></TransferMoney>
        </ViewSelect>
      </div>
    );
  }
}
