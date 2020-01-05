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

export default class extends React.Component {
  constructor(props){/*apiCall*/
    super(props);
    this.state = { balance: {}, bonuses: {} };

    props.apiCall('getUserBalance').then( r => this.setState({ balance: r.result }) );
    props.apiCall('getUserBonuses').then( r => this.setState({ bonuses: r.result }) );
  }

  render(){
    var view;
    switch( this.props.location ){
      case '/finances':
        view = (<><div className="finances__cont">
          <Balance data={ this.state.balance }
            refillClick={ () => this.props.updateLocation('/refill') }
            transferClick={ () => this.props.updateLocation('/transfer') }></Balance>

          <Bonuses data={{ ...this.state.bonuses, ...this.state.balance }}></Bonuses>
        </div>

        <WithdrawMoney apiCall={ this.props.apiCall } data={ this.state.balance }></WithdrawMoney>

        <TitleBlock title="История операций" className="finances__history">

          <PageView callback={ p => this.props.apiCall('getTransactions', p).then(r => r.result ? r.result : {}) }
            component={ History } onPageCount={ 5 }></PageView>

        </TitleBlock></>);
        break;
      case '/refill':
        view = (<AddMoney { ...this.props }></AddMoney>);
        break;
      case '/transfer':
        view = (<TransferMoney { ...this.props }></TransferMoney>);
        break;
    }

    return (
      <div className="main__content finances">
        { view }
      </div>
    );
  }
}
