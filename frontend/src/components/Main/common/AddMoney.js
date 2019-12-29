import React from 'react';
import './AddMoney.css'
import Form from '../../common/Form.js'
import Input from '../../common/Input.js'
import Switch from '../../common/Switch.js'
import MoneyFormContainer from './MoneyFormContainer.js'
import { TRANSACTION_STATUS } from '../../../const.js'

export default class extends React.Component {
  constructor(props) {/*apiCall*/
    super(props);
    this.state = {
      balance: {},
      rate: {},
      payMethod: 0,
      ytAmount: '',
      view: 0,
      serverTotal: 0
    }

    props.apiCall('getUserBalance').then(r => {
      if( r.status === 'error' ) return;
      this.setState({ balance: r.result });
    });
    props.apiCall('getMoneyRate').then(r => {
      if( r.status === 'error' ) return;
      this.setState({ rate: r.result });
    });
    props.apiCall('getPaymentWallets').then(r => {
      this.setState({ wallets: r.result });
    });
  }

  render(){
    var money = this._calcMoney(), view;
    if( this.state.view === 0 ) {

      view = (<Form formTitle="Пополнение баланса" submitTitle="КУПИТЬ YT"
          submitCallback={ this._onSubmit }>

          <Switch titles={[ 'PAYPAL', 'ETHEREUM' ]} active={ this.state.payMethod }
            onClick={ ind => this.setState({ payMethod: ind, sum: this._calcMoney( this.state.ytAmount ) }) }></Switch>

          <Input attr={{
                value: this.state.ytAmount,
                onChange: e => this.setState({ ytAmount: e.target.value })
              }}
            label="Количество YT" regexp={ /^[0-9]*$/ }></Input>

          <Input className="label-top" attr={{ readOnly: true, value: money.sum }}label="Сумма">
            <span className="add-money__sum-label">+ комиссия 2%</span>
          </Input>

          <Input className="label-top add-money__total" attr={{ readOnly: true, value: money.total }} label="Итоговая сумма"></Input>

        </Form>);

    } else if( this.state.view === 1 ){

      view = (<><div className="add-money__transaction show-message">
        <div className="message">Статус транзакции: { TRANSACTION_STATUS[ this.state.transactionStatus ].title }</div>
        <div className="add-money__cont">
          <h3>Оплата</h3>
          <h2>Отправьте</h2>
          { this.state.serverTotal.toFixed(5) } { this.state.payMethod === 0 ? 'USD' : 'ETH' }
          <Input className="add-money__wallet label-top" label="На адрес:"
            attr={{ readOnly: true,
              value: this.state.payMethod === 0 ? this.state.wallets.paypal_wallet : this.state.wallets.eth_wallet
            }}>
          </Input>
        </div>
      </div></>);

    }

    return (<MoneyFormContainer info={<>
      <div className="interface-block">
        <span className="label">Ваш текущий баланс YT</span>
        <span className="value">{ this.state.balance.account_balance }</span>
      </div>
      <div className="interface-block">
        <span className="label">Текущий курс YT к ETH</span>
        <span className="value">{ this.state.rate.eth_rate }</span>
      </div>
    </>}>
      { view }
    </MoneyFormContainer>);
  }

  _onSubmit = d => {
    if( this.state.ytAmount === 0 ) return;
    return this.props.apiCall('addMoney', { payMethod: this.state.payMethod, amount: this.state.ytAmount }).then(r => {
      if( r.status === 'error' ) return r;
      this.setState({ view: 1,
          serverTotal: r.result.total,
          payMethod: r.result.payMethod,
          transactionStatus: r.result.transactionStatus
        });
      return r;
    });
  }

  _calcMoney = () => {
    var rate = this.state.payMethod === 0 ? this.state.rate.usd_rate : this.state.rate.eth_rate;
    if( rate === undefined ) rate = 0;
    if( this.state.ytAmount === '' ) return { sum: '', total: '' };
    var sum =  this.state.ytAmount * rate;
    return {
      sum: sum.toFixed(5),
      total: (sum * 1.02).toFixed(5)
    }
  }

}
