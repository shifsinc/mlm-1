import React from 'react';
import './PurchaseRobot.css'
import Link from '../../common/Link.js'
import Popup from '../../common/Popup.js'
import Form from '../../common/Form.js'
import Input from '../../common/Input.js'
import ViewSelect from '../../common/ViewSelect.js'
import { RATES_PRICES, RATES_IMAGES, RATES_TITLES, passwordRegexp } from '../../../const.js'

export default class extends React.Component {
  constructor(props){/*updateLocation, apiCall, noMoneyCallback, data*/
    super(props);
    this.state = {
      popup: null,
      selectedRate: null,
      currentRate: props.data ? props.data.user_rate : null
    };
  }
  render(){
    var currentRate = this.state.currentRate ? this.state.currentRate : (this.props.data ? this.props.data.user_rate : null);
    Object.assign(this.state, { currentRate });

    var popupInputs, popupTitle;
    if( this.state.selectedRate > this.state.currentRate ){
      popupInputs = (<><Input label="Введите номер счета 1" attr={{ name: 'account1', autoFocus: true }}></Input>
      { ( this.state.selectedRate >= 3 ) ? (<Input label="Введите номер счета 2" attr={{ name: 'account2' }}></Input>) : undefined }
      </>);
      popupTitle = 'ПОЗДРАВЛЯЕМ С ПОКУПКОЙ РОБОТА!';
    } else if( this.state.selectedRate < this.state.currentRate ) popupTitle = 'ЗАМЕНА РОБОТА';
    else popupTitle = 'ПРОДЛЕНИЕ РОБОТА';

    return (<div className="purchase-robot">
      <div className="purchase-robot__robot">
        <img src={ RATES_IMAGES[ 1 ] } alt="client"/>
        <Link className="button button-client" onClick={() => this._onBuyClick(1)}>
          { currentRate === 1 ? 'Продлить' : 'Купить' }
        </Link>
      </div>
      <div className="purchase-robot__robot">
        <img src={ RATES_IMAGES[ 2 ] } alt="light"/>
        <Link className="button button-light" onClick={() => this._onBuyClick(2)}>
          { currentRate === 2 ? 'Продлить' : 'Купить' }
        </Link>
      </div>
      <div className="purchase-robot__robot">
        <img src={ RATES_IMAGES[ 3 ] } alt="advanced"/>
        <Link className="button button-advanced" onClick={() => this._onBuyClick(3)}>
          { currentRate === 3 ? 'Продлить' : 'Купить' }
        </Link>
      </div>
      <div className="purchase-robot__robot">
        <img src={ RATES_IMAGES[ 4 ] } alt="master"/>
        <Link className="button button-master" onClick={() => this._onBuyClick(4)}>
          { currentRate === 4 ? 'Продлить' : 'Купить' }
        </Link>
      </div>

      <ViewSelect active={ this.state.popup }>

        <Popup className="purchase-robot__popup" onClose={ () => this.setState({ popup: null }) }>
          <h3>КУПИТЬ ПАКЕТ "{ RATES_TITLES[ this.state.selectedRate ] }"?</h3>
          <Form submitTitle="Да"
            submitClassName="purchase-robot__popup-confirm__button"
            submitCallback={() => this.setState({ popup: 1 }) }>

            <Link className="button button-inactive purchase-robot__popup-confirm__button"
              onClick={ () => this.setState({ popup: null }) }>Нет</Link>

          </Form>
        </Popup>

        <Popup className="purchase-robot__popup" onClose={ () => this.setState({ popup: null }) }>
          <Form formTitle={ popupTitle } submitTitle="Сохранить" submitClassName="purchase-robot__save-accounts"
            submitCallback={ this._onSubmit }>
            { popupInputs }
            <Input label="Введите пароль" regexp={ passwordRegexp } attr={{ name: 'current_password', type: 'password' }}></Input>
          </Form>
        </Popup>

      </ViewSelect>

    </div>);
  }

  _onSubmit = d => {
    var rate = this.state.selectedRate;
    return this.props.apiCall('buyRobot', { rate, ...d }).then(r => {
      if( r.status === 'error' ) return r;
      this.setState({ popup: null, currentRate: rate });
      this.props.updateLocation('/robot');
      return r;
    });
  }

  _onBuyClick = rate => {
    this.props.apiCall('getUserBalance').then(r => {
      if( r.status === 'error' ) return;

      var price, curRate = this.state.currentRate ? this.state.currentRate : 0;
      if( rate <= curRate ) price = 0;
      else price = RATES_PRICES[ rate ] - RATES_PRICES[ curRate ];

      if( r.result.account_balance < price ) this.props.noMoneyCallback();
      else {
        var popup = ( rate > this.state.currentRate ) ? 0 : 1;
        this.setState({ popup, selectedRate: rate });
      }
    });
  }
}
