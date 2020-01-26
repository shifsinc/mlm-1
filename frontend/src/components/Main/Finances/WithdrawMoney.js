import React from 'react';
import './WithdrawMoney.css'
import Input from '../../common/Input.js'
import Form from '../../common/Form.js'
import Popup from '../../common/Popup.js'
import ViewSelect from '../../common/ViewSelect.js'
import { WITHDRAW_COMMISSION, MIN_WITHDRAW_AMOUNT } from '../../../const.js'

export default class extends React.Component {
  constructor(props) {/*data, onWithdraw apiCall*/
    super(props);
    this.state = {
      moneyRate: {},
      amount: '',
      commission: 0,
      msg: null,
      popup: null
    }

    props.apiCall('getMoneyRate').then( r => {
      if( r.status === 'error' ) return;
      this.setState({ moneyRate: r.result });
    });
  }

  render(){
    var msg = this.state.msg ? this.state.msg : ('-' + (WITHDRAW_COMMISSION * 100 ) + '% = ' + this.state.commission + ' ETH');

    return (
      <div className="interface-block finances__withdraw-money">

        <Input regexp={ /^[0-9]*$/ } label="Вывод средств" className="finances__withdraw-money__input"
          attr={{ value: this.state.amount, onChange: this._onChange }}>
          <div className="finances__withdraw-money__button input__button" onClick={ this._onSubmit }>Вывести средства</div>
        </Input>
        <span className="finances__withdraw-money__message">{ msg }</span>

        <ViewSelect active={ this.state.popup }>

          <Popup className="withdraw-money__popup"
          onClose={ () => this.setState({ popup: null }) }>

            <Form submitTitle="ВЫВЕСТИ" formTitle={ 'Вы уверены, что хотите списать ' + this.state.amount + ' YT?' }
              submitCallback={ this._onConfirm }>
              <div className="popup__text">
                Перед подтверждением проверьте Ваш кошелёк ETHEREUM:
              </div>
              <div className="popup__text"><b>{ this.props.data.account_ethereum }</b></div>
              <Input label="Введите пароль" attr={{ name: 'current_password', type: 'password' }}></Input>
            </Form>
          </Popup>

        </ViewSelect>

      </div>
    );
  }

  _onChange = e => {
    if( !this.state.moneyRate  ) return;
    var _v = e.target.value;
    var v = e.target.value * this.state.moneyRate.rate_eth * WITHDRAW_COMMISSION;
    if( !isNaN(v) ) this.setState({ amount: _v, commission: v.toFixed(5), msg: null })
  }

  _onSubmit = () => {
    if( this.state.amount <= 0 || this.state.amount > this.props.data.account_balance )
      return this.setState({ msg: 'Недостаточно средств' });
    if( this.state.amount < MIN_WITHDRAW_AMOUNT )
      return this.setState({ msg: 'Минимальная сумма для вывода: ' + MIN_WITHDRAW_AMOUNT + ' YT' });
    this.setState({ popup: 0 });
  }

  _onConfirm = d => {
    var amount = this.state.amount;
    return this.props.apiCall('withdrawMoney', { amount: amount, ...d }).then(r => {
      if( r.status === 'error' ) return r;
      this.setState({ amount: '', msg: r.action.text, popup: null });
      if( this.props.onWithdraw ) this.props.onWithdraw( amount );
      return r;
    });
  }

}
