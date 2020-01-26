import React from 'react';
import './AddMoney.css'
import Form from '../../common/Form.js'
import Input from '../../common/Input.js'
import Switch from '../../common/Switch.js'
import ViewSelect from '../../common/ViewSelect.js'
import { TRANSACTION_STATUS_TITLES, PAY_METHOD_ETH/*, PAY_METHOD_PAYPAL*/ } from '../../../const.js'

export default class extends React.Component {
  constructor(props) {/*apiCall*/
    super(props);
    this.state = {
      balance: {},
      moneyRate: {},
      wallets: {},
      billing: {},
      payMethod: 0,
      ytAmount: '',
      view: 0,
      serverTotal: 0
    }

    props.apiCall('getUserBalance').then(r => this.setState({ balance: r.result }));
    props.apiCall('getMoneyRate').then(r => this.setState({ moneyRate: r.result }));
    props.apiCall('getPaymentWallets').then(r => this.setState({ wallets: r.result }));
    props.apiCall('getBilling').then(r => this.setState({ billing: r.result }));
  }

  render(){
    var money = this._calcMoney();
    return (<div className="add-money">
      <div className="interface-block money-cont__main">

        <ViewSelect active={ this.state.view }>
        <Form formTitle="Пополнение баланса" submitTitle="КУПИТЬ YT"
            submitCallback={ this._onSubmit }>
            <Switch titles={[ 'ETHEREUM'/*, 'PAYPAL'*/ ]} active={ this.state.payMethod }
              onClick={ ind => this.setState({ payMethod: ind, sum: this._calcMoney( this.state.ytAmount ) }) }></Switch>

            <Input label="Количество YT" regexp={ /^[0-9]*$/ } attr={{
                value: this.state.ytAmount,
                onChange: e => this.setState({ ytAmount: e.target.value })
              }}></Input>

            <Input className="label-top" attr={{ readOnly: true, value: money.sum }}label="Сумма">
              <span className="add-money__sum-label">+ комиссия 2%</span>
            </Input>

            <Input className="label-top add-money__total" attr={{ readOnly: true, value: money.total }} label="Итоговая сумма"></Input>
          </Form>

          <><div className="add-money__transaction show-message">
            <div className="message">
              Статус транзакции: <span>{ TRANSACTION_STATUS_TITLES[ this.state.transactionStatus ] }</span>
            </div>
            <div className="add-money__transaction__cont">
              <h2>ОПЛАТА</h2>
              <h5>ОТПРАВЬТЕ</h5>
              <span>{ this.state.serverTotal.toFixed(5) } { this.state.payMethod === PAY_METHOD_ETH ? 'ETH' : 'USD' }</span>
              <h5>
                С адреса: { this.state.payMethod === PAY_METHOD_ETH ?
                    this.state.billing.account_ethereum : this.state.billing.account_paypal }
              </h5>
              <Input className="add-money__wallet label-top" label="На адрес:" attr={{
                  readOnly: true,
                  value: this.state.payMethod === PAY_METHOD_ETH ? this.state.wallets.eth_wallet : this.state.wallets.paypal_wallet
                }}>
              </Input>
            </div>
          </div></>
        </ViewSelect>

      </div>
      <div className="money-cont__info">
        <div className="interface-block">
          <span className="label">Ваш текущий баланс YT</span>
          <span className="value">{ this.state.balance.account_balance }</span>
        </div>
        <div className="interface-block">
          <span className="label">Текущий курс YT к ETH</span>
          <span className="value">{ this.state.moneyRate.rate_eth }</span>
        </div>
      </div>
    </div>);
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
    var rate = this.state.payMethod === PAY_METHOD_ETH ? this.state.moneyRate.rate_eth : this.state.moneyRate.rate_usd;
    if( rate === undefined ) rate = 0;
    if( this.state.ytAmount === '' ) return { sum: '', total: '' };
    var sum =  this.state.ytAmount * rate;
    return {
      sum: sum.toFixed(5),
      total: (sum * 1.02).toFixed(5)
    }
  }

}
