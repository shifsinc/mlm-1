import React from 'react';
import './PurchaseRobot.css'
import Link from '../../common/Link.js'
import Popup from '../../common/Popup.js'
import Form from '../../common/Form.js'
import Input from '../../common/Input.js'
import { RATES_PRICE, passwordRegexp } from '../../../const.js'

import robotClient from '../../../img/robot_client@2x.png'
import robotLight from '../../../img/robot_light@2x.png'
import robotAdvanced from '../../../img/robot_advanced@2x.png'
import robotMaster from '../../../img/robot_master@2x.png'

export default class extends React.Component {
  constructor(props){/*updateLocation, apiCall, noMoneyCallback*/
    super(props);
    this.state = {
      popupDisplay: 0,
      selectedRate: ''
    };
  }
  render(){/*data*/
    var data = this.props.data ? this.props.data : {}, popup;

    if( this.state.popupDisplay === 1 ){

      popup = (<Popup display={ true } className="purchase-robot__popup-confirm"
        onClose={ () => this.setState({ popupDisplay: 0 }) }>
        <h3>КУПИТЬ ПАКЕТ "{ this.state.selectedRate }"?</h3>
        <Form submitTitle="Да"
          submitClassName="purchase-robot__popup-confirm__button"
          submitCallback={() => {
            return this.props.apiCall('buyRobot', { rate: this.state.selectedRate }).then(r => {
              if( r.status === 'error' ) return r;
              this.setState({ popupDisplay: 2 });
              return r;
            });
          }}>

          <Link className="button button-inactive purchase-robot__popup-confirm__button"
            onClick={ () => this.setState({ popupDisplay: 0 }) }>Нет</Link>

        </Form>
      </Popup>);

    } else if( this.state.popupDisplay === 2 ){

      popup = (<Popup display={ true } onClose={ () => this.setState({ popupDisplay: 0 }) }>
        <Form formTitle="ПОЗДРАВЛЯЕМ С ПОКУПКОЙ РОБОТА!" submitTitle="Сохранить" submitClassName="purchase-robot__save-accounts"
          submitCallback={ d => {
            return this.props.apiCall('addRobotKeys', { ...d, rate: this.state.selectedRate }).then(r => {
              if( r.status === 'error' ) return r;
              this.setState({ popupDisplay: 0 });
              this.props.updateLocation('/robot');
              return r;
            });
          } }>
          <Input label="Введите номер счета 1" attr={{ name: 'account1', autoFocus: true }}></Input>

          { ( this.state.selectedRate === 'advanced' || this.state.selectedRate === 'master' ) ? (
            <Input label="Введите номер счета 2" attr={{ name: 'account2' }}></Input>
          ) : undefined }

          <Input label="Введите пароль" regexp={ passwordRegexp } attr={{ name: 'current_password', type: 'password' }}></Input>
        </Form>
      </Popup>);

    }

    return (<div className="purchase-robot">
      <div className="purchase-robot__robot">
        <img src={ robotClient } alt="client"/>
        <Link className="button button-client" onClick={() => this._onClick('client')}>
          { data.user_rate === 'client' ? 'Куплено' : 'Купить' }
        </Link>
      </div>
      <div className="purchase-robot__robot">
        <img src={ robotLight } alt="light"/>
        <Link className="button button-light" onClick={() => this._onClick('light')}>
          { data.user_rate === 'light' ? 'Куплено' : 'Купить' }
        </Link>
      </div>
      <div className="purchase-robot__robot">
        <img src={ robotAdvanced } alt="advanced"/>
        <Link className="button button-advanced" onClick={() => this._onClick('advanced')}>
          { data.user_rate === 'advanced' ? 'Куплено' : 'Купить' }
        </Link>
      </div>
      <div className="purchase-robot__robot">
        <img src={ robotMaster } alt="master"/>
        <Link className="button button-master" onClick={() => this._onClick('master')}>
          { data.user_rate === 'master' ? 'Куплено' : 'Купить' }
        </Link>
      </div>
      { popup }
    </div>);
  }

  _onClick = rate => {
    if( this.props.data && this.props.data.user_rate === rate ) return //this.setState({ popupDisplay: 2, selectedRate: rate });
    this.props.apiCall('getUserBalance').then(r => {
      if( r.status === 'error' ) return;
      if( r.result.account_balance < RATES_PRICE[ rate ] ) this.props.noMoneyCallback();
      else this.setState({ popupDisplay: 1, selectedRate: rate });
    });
  }
}
