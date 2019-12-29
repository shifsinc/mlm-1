import React from 'react';
import './WithdrawMoney.css'
import Input from '../../common/Input.js'
import { WITHDRAW_COMMISSION } from '../../../const.js'

export default class extends React.Component {
  constructor(props) {/*data, apiCall*/
    super(props);
    this.state = {
      rate: {},
      amount: '',
      commission: 0,
      msg: null
    }

    props.apiCall('getMoneyRate').then( r => {
      if( r.status === 'error' ) return;
      this.setState({ rate: r.result });
    });
  }

  render(){
    var msg = this.state.msg ? this.state.msg : ('-' + (WITHDRAW_COMMISSION * 100 ) + '% = ' + this.state.commission + ' ETH');
    return (
      <div className="interface-block finances__withdraw-money">
        <Input regexp={ /^[0-9]*$/ } label="Вывод средств" attr={{ value: this.state.amount, onChange: e => {
          if( !this.state.rate  ) return;
          var _v = e.target.value;
          var v = e.target.value * this.state.rate.eth_rate * WITHDRAW_COMMISSION;
          if( !isNaN(v) ) this.setState({ amount: _v, commission: v.toFixed(5), msg: null })
        } }}>
          <div className="finances__withdraw-money__button" onClick={ this._onClick }>Вывести средства</div>
        </Input>
        <span className="finances__withdraw-money__message">{ msg }</span>
      </div>
    );
  }

  _onClick = () => {
    if( this.state.amount <= 0 || this.state.amount > this.props.data.account_balance ) return;
    this.props.apiCall('withdrawMoney', { amount: this.state.amount }).then(r => {
      if( r.status === 'error' ) this.setState({ msg: r.action.text });
      else this.setState({ amount: '', msg: r.action.text });
    });
  }

}
