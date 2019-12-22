import React from 'react';
import './Settings.css'
import DataForm from '../DataForm.js'
import Form from '../Form.js'
import Input from '../Input.js'
import TabView from '../TabView.js'
import Popup from '../Popup.js'

import { passwordRegexp, ethereumRegexp, paypalRegexp } from '../../const.js'

export default class extends React.Component {
  constructor(props){/*apiCall*/
    super(props);

    this.state = {
      account_ethereum: '',
      account_paypal: ''
    };
    props.apiCall('getBilling').then(r => {
      if( !r.result ) return;
      var res = r.result;
      this.setState({
        account_ethereum: res.account_ethereum ? res.account_ethereum : '',
        account_paypal: res.account_paypal ? res.account_paypal : ''
      });
    });
  }

  render(){
    var passCallback = () => {}, curPass;
    return (
      <div className="main__content settings">
        <TabView titles={[ 'Личные данные', 'Платежные данные' ]}
          className="settings__cont interface-block" { ...this.props }>

          <div>
            <DataForm
              { ...this.props }
              passwordFields={ true }
              className="settings__form"
              submitCallback={data => {
                var resolve;
                passCallback = pass => {
                  Object.assign(data, pass);
                  resolve( this.props.apiCall('updateUserInfo', data) );
                }
                window.document.body.querySelector('.confirm-password-cover').style.display = 'block';
                curPass.focus();
                return new Promise( (res, rej) => {
                  resolve = res;
                } );
              }} ></DataForm>
            <Popup className="confirm-password-cover">
              <Form formTitle="ПОДТВЕРДИТЕ ИЗМЕНЕНИЯ" submitTitle="ПОДТВЕРДИТЬ" className="settings__confirm interface-block"
                submitCallback={ d => {
                  curPass.value = '';
                  window.document.body.querySelector('.confirm-password-cover').style.display = 'none';
                  passCallback(d);
                }}>
                <Input attr={{ name: 'current_password', type: 'password', ref: r => curPass = r  }}
                  regexp={ passwordRegexp } label="Введите текущий пароль"></Input>
              </Form>
            </Popup>
          </div>

          <div>
            <Form submitTitle="СОХРАНИТЬ" submitCallback={ data => this.props.apiCall('updateBilling', data) }>
              <Input attr={{ name: "ethereum",
                value: this.state.account_ethereum, onChange: e => this.setState({ account_ethereum: e.target.value }) }}
                regexp={ ethereumRegexp } label="Ваш Ethereum-адрес"/>
              <Input attr={{ name: "paypal",
                value: this.state.account_paypal, onChange: e => this.setState({ account_paypal: e.target.value }) }}
                regexp={ paypalRegexp } label="Ваш PayPal"/>
            </Form>
          </div>

        </TabView>
      </div>
    );
  }
}
