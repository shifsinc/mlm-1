import React from 'react';
import './Settings.css'
import DataForm from '../DataForm.js'
import Form from '../Form.js'
import Input from '../Input.js'
import TabView from '../TabView.js'
import Popup from '../Popup.js'

import { passwordRegexp } from '../../const.js'

export default function(props){/*updateLocation*/
  var passCallback = () => {};
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
                resolve( props.apiCall('updateData', data) );
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
          <Form submitTitle="СОХРАНИТЬ" submitCallback={ () => {} }>
            <Input label="Ваш Ethereum-адрес"/>
            <Input label="Ваш PayPal"/>
          </Form>
        </div>

      </TabView>
    </div>
  );
}
