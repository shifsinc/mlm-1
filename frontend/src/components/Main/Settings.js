import React from 'react';
import './Settings.css'
import DataForm from '../DataForm.js'
import Form from '../Form.js'
import Input from '../Input.js'
import TabView from '../TabView.js'
import Popup from '../Popup.js'

import { passwordRegexp } from '../../const.js'

export default function(props){/*updateLocation*/
  var passCallback = () => {}, ethereum, paypal;
  setTimeout(() => {
    props.apiCall('getBilling').then(r => {
      if( !r.result ) return;
      var res = r.result;
      ethereum.value = res.account_ethereum;
      paypal.value = res.account_paypal;
    });
  }, 0);
  return (
    <div className="settings main__content">
      <TabView titles={[ 'Личные данные', 'Платежные данные' ]}
        className="settings__cont interface-block" { ...props }>

        <div>
          <DataForm
            { ...props }
            passwordFields={ true }
            className="settings__form"
            submitCallback={data => {
              var resolve;
              passCallback = pass => {
                Object.assign(data, pass);
                resolve( props.apiCall('updateUserInfo', data) );
              }
              window.document.body.querySelector('.confirm-password-cover').style.display = 'block';
              return new Promise( (res, rej) => {
                resolve = res;
              } );
            }} ></DataForm>
          <Popup className="confirm-password-cover">
            <Form formTitle="ПОДТВЕРДИТЕ ИЗМЕНЕНИЯ" submitTitle="ПОДТВЕРДИТЬ" className="settings__confirm interface-block"
              submitCallback={ d => {
                window.document.body.querySelector('.confirm-password-cover').style.display = 'none';
                passCallback(d);
              }}>
              <Input attr={{ name: 'current_password', type: 'password'  }}
                regexp={ passwordRegexp } label="Введите текущий пароль"></Input>
            </Form>
          </Popup>
        </div>

        <div>
          <Form submitTitle="СОХРАНИТЬ" submitCallback={ data => props.apiCall('updateBilling', data) }>
            <Input attr={{ name: "ethereum", ref: r => ethereum = r }} label="Ваш Ethereum-адрес"/>
            <Input attr={{ name: "paypal", ref: r => paypal = r }} label="Ваш PayPal"/>
          </Form>
        </div>

      </TabView>
    </div>
  );
}
