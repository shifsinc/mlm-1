import React from 'react';
import './TransferMoney.css'
import './common.css'
import Form from '../../common/Form.js'
import Input from '../../common/Input.js'
import Popup from '../../common/Popup.js'
import Table from '../../common/Table.js'
import ViewSelect from '../../common/ViewSelect.js'
import { phoneRegexp, emailRegexp } from '../../../const.js'

export default class extends React.Component {
  constructor(props) {/*updateLocation, apiCall*/
    super(props);
    this.state = {
      balance: {},
      popup: null,
      data: {}
    }

    props.apiCall('getUserBalance').then(r => {
      if( r.status === 'error' ) return;
      this.setState({ balance: r.result });
    });
  }

  render(){
    return (<div className="transfer-money">
      <div className="interface-block money-cont__main">
        <Form formTitle="ПЕРЕВОД YT" submitTitle="ПЕРЕВЕСТИ YT"
          submitCallback={ this._onSubmit }>
            <Input label="Количество YT" regexp={ /^[0-9]*$/ } attr={{ name: 'amount', autoFocus: true }}></Input>

            <Input label="Email или код рефера" regexp={[ phoneRegexp, emailRegexp ]} attr={{ name: 'receiver' }}></Input>

            <Input label="Пароль от личного кабинета" attr={{ name: 'current_password', type: 'password' }}></Input>
        </Form>
      </div>
      <div className="money-cont__info">
        <div className="interface-block">
          <span className="label">Ваш текущий баланс YT</span>
          <span className="value">{ this.state.balance.account_balance }</span>
        </div>
      </div>

      <ViewSelect active={ this.state.popup }>

        <Popup onClose={ () => this.setState({ popup: null }) } className="transfer-money__popup">
          <Form formTitle="ПОДТВЕРЖДЕНИЕ ПЕРЕВОДА" submitTitle="ПОДТВЕРДИТЬ"
            submitCallback={ this._onConfirm }>
            <Table>
              <tr><td>Сумма</td><td>{ this.state.data.amount }</td></tr>
              <tr><td>E-mail рефера</td><td>{ this.state.data.receiver }</td></tr>
            </Table>
          </Form>
        </Popup>

        <Popup onClose={ () => this.props.updateLocation('/finances') } className="transfer-money__popup">
          <h3>ПОДТВЕРЖДЕНИЕ ПЕРЕВОДА</h3>
          <span>Перевод успешно проведен!</span>
        </Popup>

      </ViewSelect>
    </div>);
  }

  _onSubmit = d => {
    if( !d.amount || !d.receiver || !d.current_password ) return;
    this.setState({ popup: 0, data: d })
  }

  _onConfirm = () => {
    return this.props.apiCall('transferMoney', this.state.data).then(r => {
      if( r.status === 'error' ) return r;
      this.setState({ popup: 1 });
      return r;
    });
  }

}
