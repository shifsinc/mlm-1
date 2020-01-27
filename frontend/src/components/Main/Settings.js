import React from 'react';
import './Settings.css'
import DataForm from '../common/DataForm.js'
import Form from '../common/Form.js'
import Input from '../common/Input.js'
import TabView from '../common/TabView.js'
import Popup from '../common/Popup.js'
import ViewSelect from '../common/ViewSelect.js'

import { ethereumRegexp/*, paypalRegexp*/ } from '../../const.js'

export default class extends React.Component {
  constructor(props){/*apiCall, uploadFile*/
    super(props);
    this.state = {
      account_ethereum: '',
      account_paypal: '',
      popup: null
    };

    props.apiCall('getBilling').then(r => {
      if( !r.result ) return;
      var res = r.result,
        account_ethereum = res.account_ethereum ? res.account_ethereum : '',
        account_paypal = res.account_paypal ? res.account_paypal : '';
      this.setState({ account_ethereum, account_paypal });
    });

    this.passCallback = () => {};
  }

  render(){
    return (
      <div className="main__content">
        <TabView tabs={[
          { title: 'Личные данные', name: 'personal' },
          { title: 'Платежные данные', name: 'payment' }
        ]} className="interface-block settings" contClassName="settings__cont" { ...this.props }>

          <DataForm
            { ...this.props }
            passwordFields={ true }
            className="settings__form"
            submitCallback={ this._personalSubmit } ></DataForm>

          <Form submitTitle="СОХРАНИТЬ" submitCallback={ this._paymentSubmit }>
            <Input attr={{ name: "ethereum",
              value: this.state.account_ethereum,
              onChange: e => this.setState({ account_ethereum: e.target.value }) }}
              regexp={ ethereumRegexp } label="Ваш Ethereum-адрес"
              hint="Ваш Ethereum адрес, начиная с 0x"/>

            {/*<Input attr={{ name: "paypal",
              value: this.state.account_paypal,
              onChange: e => this.setState({ account_paypal: e.target.value }) }}
              regexp={ paypalRegexp } label="Ваш PayPal"/>*/}
          </Form>

        </TabView>

        <ViewSelect active={ this.state.popup }>

          <Popup className="settings__confirm" display={true}
            onClose={ () => this.setState({ popup: null }) }>
            <Form formTitle="ПОДТВЕРДИТЕ ИЗМЕНЕНИЯ" submitTitle="ПОДТВЕРДИТЬ"
              submitCallback={ d => {
                this.passCallback(d);
                this.setState({ popup: null });
              }}>

              <Input attr={{ name: 'current_password', type: 'password', autoFocus: true }} label="Введите текущий пароль"></Input>

            </Form>
          </Popup>

        </ViewSelect>

      </div>
    );
  }

  _personalSubmit = data => {
      var resolve, ret = new Promise( res => resolve = res );
      const next = () => {
        this.passCallback = pass => {
          Object.assign(data, pass);
          resolve( this.props.apiCall('updateUserInfo', data) );
        }
        this.setState({ popup: 0 });
      }
      if( data.photo ){
        this.props.uploadFile( 'uploadPhoto', data.photo[0] ).then(r => {
          if( !r.result ) return resolve(r);
          data.photo = r.result.filename;
          next();
        });
      } else next();

      return ret;

    }

  _paymentSubmit = data => {
    var resolve, ret = new Promise( res => resolve = res );
    this.passCallback = pass => {
      Object.assign(data, pass);
      resolve( this.props.apiCall('updateBilling', data) );
    }
    this.setState({ popup: 0 });
    return ret;
  }

}
