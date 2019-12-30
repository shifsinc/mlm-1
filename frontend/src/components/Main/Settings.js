import React from 'react';
import './Settings.css'
import DataForm from '../common/DataForm.js'
import Form from '../common/Form.js'
import Input from '../common/Input.js'
import TabView from '../common/TabView.js'
import Popup from '../common/Popup.js'

import { passwordRegexp, ethereumRegexp, paypalRegexp } from '../../const.js'

export default class extends React.Component {
  constructor(props){/*apiCall, uploadFile*/
    super(props);

    this.state = {
      account_ethereum: '',
      account_paypal: '',
      popupDisplay: false
    };
    props.apiCall('getBilling').then(r => {
      if( !r.result ) return;
      var res = r.result;
      this.setState({
        account_ethereum: res.account_ethereum ? res.account_ethereum : '',
        account_paypal: res.account_paypal ? res.account_paypal : ''
      });
    });
    this.passCallback = () => {};
  }

  render(){
    return (
      <div className="main__content">
        <TabView titles={[ 'Личные данные', 'Платежные данные' ]}
          className="interface-block settings" contClassName="settings__cont" { ...this.props }>

          <div>
            <DataForm
              { ...this.props }
              passwordFields={ true }
              className="settings__form"
              submitCallback={data => {
                var resolve, ret = new Promise( res => resolve = res );
                const next = () => {
                  this.passCallback = pass => {
                    Object.assign(data, pass);
                    resolve( this.props.apiCall('updateUserInfo', data) );
                  }
                  this.setState({ popupDisplay: true });
                }
                if( data.photo ){
                  this.props.uploadFile( 'uploadPhoto', data.photo ).then(r => {
                    if( !r.result ) return resolve(r);
                    data.photo = r.result.filename;
                    next();
                  });
                } else next();

                return ret;

              }} ></DataForm>
          </div>

          <div>
            <Form submitTitle="СОХРАНИТЬ" submitCallback={ data => {
              var resolve, ret = new Promise( res => resolve = res );
              this.passCallback = pass => {
                Object.assign(data, pass);
                resolve( this.props.apiCall('updateBilling', data) );
              }
              this.setState({ popupDisplay: true });
              return ret;
            } }>

              <Input attr={{ name: "ethereum",
                value: this.state.account_ethereum,
                onChange: e => this.setState({ account_ethereum: e.target.value }) }}
                regexp={ ethereumRegexp } label="Ваш Ethereum-адрес"/>

              <Input attr={{ name: "paypal",
                value: this.state.account_paypal,
                onChange: e => this.setState({ account_paypal: e.target.value }) }}
                regexp={ paypalRegexp } label="Ваш PayPal"/>

            </Form>
          </div>

        </TabView>

        { this.state.popupDisplay ? (
          <Popup className="settings__confirm" display={ this.state.popupDisplay }
            onClose={ () => this.setState({ popupDisplay: false }) }>

            <Form formTitle="ПОДТВЕРДИТЕ ИЗМЕНЕНИЯ" submitTitle="ПОДТВЕРДИТЬ"
              submitCallback={ d => {
                this.passCallback(d);
                this.setState({ popupDisplay: false });
              }}>

              <Input attr={{ name: 'current_password', type: 'password', autoFocus: true }}
                regexp={ passwordRegexp } label="Введите текущий пароль"></Input>

            </Form>

          </Popup>
        ) : undefined
      }

      </div>
    );
  }
}
