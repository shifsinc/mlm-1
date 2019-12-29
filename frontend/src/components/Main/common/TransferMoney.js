import React from 'react';
import './TransferMoney.css'
import Form from '../../common/Form.js'
import Input from '../../common/Input.js'
import MoneyFormContainer from './MoneyFormContainer.js'
import Popup from '../../common/Popup.js'
import { phoneRegexp, emailRegexp } from '../../../const.js'

export default class extends React.Component {
  constructor(props) {/*updateLocation, apiCall*/
    super(props);
    this.state = {
      balance: {},
      popup: 0
    }

    props.apiCall('getUserBalance').then(r => {
      if( r.status === 'error' ) return;
      this.setState({ balance: r.result });
    });
  }

  render(){
    var popup;

    if( this.state.popup === 1 ){

      popup = (<Popup display={ true } onClose={ () => this.setState({ popup: 0 }) } className="transfer-money__popup">
          <Form formTitle="ПОДТВЕРЖДЕНИЕ ПЕРЕВОДА" submitTitle="ПОДТВЕРДИТЬ"
            submitCallback={ () => {
              this._onSubmit( this.state.data );
          } }>
            <table className="table"><tbody>
              <tr><td>Сумма</td><td>{ this.state.data.amount }</td></tr>
              <tr><td>E-mail рефера</td><td>{ this.state.data.receiver }</td></tr>
            </tbody></table>
          </Form>
        </Popup>);

    } else if( this.state.popup === 2 ){

      popup = (<Popup display={ true } onClose={ () => this.props.updateLocation('/finances') } className="transfer-money__popup">
          <h3>ПОДТВЕРЖДЕНИЕ ПЕРЕВОДА</h3>
          <span>Перевод успешно проведен!</span>
        </Popup>);

    }

    return (<div><MoneyFormContainer info={
        <div className="interface-block">
          <span className="label">Ваш текущий баланс YT</span>
          <span className="value">{ this.state.balance.account_balance }</span>
        </div>
      }>

      <Form formTitle="ПЕРЕВОД YT" submitTitle="ПЕРЕВЕСТИ YT"
        submitCallback={ d => {
          if( !d.amount || !d.receiver || !d.current_password ) return;
          this.setState({ popup: 1, data: d })
        }}>

          <Input label="Количество YT" regexp={ /^[0-9]*$/ } attr={{ name: 'amount', autoFocus: true }}></Input>

          <Input label="Email или код рефера" regexp={[ phoneRegexp, emailRegexp ]} attr={{ name: 'receiver' }}></Input>

          <Input label="Пароль от личного кабинета" attr={{ name: 'current_password', type: 'password' }}></Input>

      </Form>

      </MoneyFormContainer>
      { popup }
    </div>);
  }

  _onSubmit = d => {
    return this.props.apiCall('transferMoney', d).then(r => {
      if( r.status === 'error' ) return r;
      this.setState({ popup: 2 });
      return r;
    });
  }

}
