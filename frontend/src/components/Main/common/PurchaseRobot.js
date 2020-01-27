import React from 'react';
import './PurchaseRobot.css'
import Link from '../../common/Link.js'
import Popup from '../../common/Popup.js'
import Form from '../../common/Form.js'
import Input from '../../common/Input.js'
import Hint from '../../common/Hint.js'
import ViewSelect from '../../common/ViewSelect.js'
import AddRobotKeysPopup from './AddRobotKeysPopup.js'
import { RATES_PRICES, RATES_IMAGES, RATES_TITLES, RATES_COUNT, ROBOT_SALE_TIME } from '../../../const.js'

const RATES_HINTS = [
  '',
  <ul>
  <li>Client (250$) 1 лицензия</li>
  <li>Лимит депозита: 2000$</li>
  <li>Линейный бонус 1-й ур: 10%</li>
</ul>,
  <ul>
  <li>Light (500$) 1 лицензия</li>
  <li>Лимит депозита: 5000$</li>
  <li>Линейный бонус 1-й ур: 10%</li>
  <li>Линейный бонус 2-й ур: 3%</li>
  <li>Средние бонусы по программе</li>
</ul>,
  <ul>
  <li>Advanced (1000$) 2 лицензии</li>
  <li>Лимит депозита: 15000$ - 1 лиц</li>
  <li>Линейный бонус 1-й ур: 13%</li>
  <li>Линейный бонус 2-й ур: 4%</li>
  <li>Высокие бонусы по программе</li>
  </ul>,
  <ul>
  <li>Master (2000$) 2 лицензии</li>
  <li>Лимит депозита: 50000$ - 1 лиц</li>
  <li>Линейный бонус 1-й ур: 16%</li>
  <li>Линейный бонус 2-й ур: 5%</li>
  <li>VIP бонусы по программе</li>
  </ul>
]

export default class extends React.Component {
  constructor(props){/*updateLocation, apiCall, noMoneyCallback, okCallback, data*/
    super(props);
    this.state = {
      popup: null,
      selectedRate: null,
      currentRate: props.data ? props.data.user_rate : null,
      currentPrice: null
    };
  }
  render(){
    var data = this.props.data ? this.props.data : {};
    var currentRate = this.state.currentRate ? this.state.currentRate : data.user_rate;
    var isSale = data.user_rate_ts && ( ( new Date() - new Date( data.user_rate_ts ) ) <= ROBOT_SALE_TIME );
    Object.assign(this.state, { currentRate, isSale });

    var rates = [];
    for( var ind = 1 ; ind <= RATES_COUNT ; ind++ ){
      var title;
      if( ind === currentRate ) title = 'ПРОДЛИТЬ';
      else if( currentRate !== null && ind > currentRate && this.state.isSale ) title = 'ПОВЫСИТЬ';
      else title = 'КУПИТЬ';

      var disabled = ind < currentRate;
      var rateClass = RATES_TITLES[ ind ].toLowerCase();
      rates.push(<div key={ ind } className="purchase-robot__robot">
        <img src={ RATES_IMAGES[ ind ] } alt={ RATES_TITLES[ ind ] }/>
        <div className="purchase-robot__robot__cont">
          <Link className={ 'button button-' + rateClass } disabled={ disabled }
            onClick={ this._onBuyClick.bind(this, ind) }>
            { title }
          </Link>
          <Hint position="top" size="md" className={ 'purchase-robot__robot__hint hint-' + rateClass }>{ RATES_HINTS[ ind ] }</Hint>
        </div>
      </div>);
    }

    return (<div className="purchase-robot">
      { rates }

      <ViewSelect active={ this.state.popup }>

        <Popup className="purchase-robot__popup-confirm" onClose={ this._closePopup }>
          <Form formTitle={ 'КУПИТЬ ПАКЕТ "' + RATES_TITLES[ this.state.selectedRate ] + '"?' }
            submitTitle="Да" submitCallback={ this._onBuySubmit }>

            <div className="popup__text">С Вашего счета будет списано { this.state.currentPrice } YT</div>
            <Input label="Введите пароль" attr={{ name: 'current_password', type: 'password' }}></Input>
            <Link className="button button-inactive purchase-robot__popup-confirm__button"
              onClick={ this._closePopup }>Нет</Link>

          </Form>
        </Popup>

        <AddRobotKeysPopup title="ПОЗДРАВЛЯЕМ С ПОКУПКОЙ РОБОТА!"
          onClose={ () => { this.props.okCallback(this.state.selectedRate, 2); this._closePopup() } }
          onSubmit={ this._onAddKeysSubmit } extraInput={ this.state.selectedRate >= 3 }>
        </AddRobotKeysPopup>

        <Popup className="purchase-robot__popup-save" onClose={ this._closePopup }>
          <Form formTitle="ЗАМЕНА РОБОТА" submitTitle="Сохранить" submitCallback={ () => {} }>
            <Input label="Введите пароль" attr={{ name: 'current_password', type: 'password' }}></Input>
          </Form>
        </Popup>

        <Popup className="purchase-robot__popup-save" onClose={ this._closePopup }>
          <Form formTitle="ПРОДЛЕНИЕ РОБОТА" submitTitle="Сохранить" submitCallback={ this._onExtendSubmit }>
            <div className="purchase-robot__popup__prompt">
              С Вашего счета будет списано { RATES_PRICES[ this.state.selectedRate ] } YT
            </div>
            <Input label="Введите пароль" attr={{ name: 'current_password', type: 'password' }}></Input>
          </Form>
        </Popup>

      </ViewSelect>

    </div>);
  }

  _closePopup = () => this.setState({ popup: null });

  _onBuyClick = rate => {
    this.props.apiCall('getUserBalance').then(r => {
      if( r.status === 'error' ) return;

      var price, curRate = this.state.currentRate ? this.state.currentRate : 0;
      if( rate <= curRate ) price = 0;
      else {
        if( this.state.isSale && curRate ) price = RATES_PRICES[ rate ] - RATES_PRICES[ curRate ];
        else price = RATES_PRICES[ rate ];
      }

      if( r.result.account_balance < price ) this.props.noMoneyCallback();
      else {
        var popup;
        if( rate > this.state.currentRate || !this.state.currentRate ) popup = 0;
        else if(rate < this.state.currentRate ) popup = 2;
        else popup = 3;
        this.setState({ popup, selectedRate: rate, currentPrice: price });
      }
    });
  }

  _onBuySubmit = d => {
    var rate = this.state.selectedRate;
    return this.props.apiCall('buyRobot', { rate, ...d }).then(r => {
      if( r.status === 'error' ) return r;
      this.setState({ popup: 1, currentRate: rate });
      this.props.okCallback(rate, 1);
      return r;
    });
  }

  _onAddKeysSubmit = d => {
    var rate = this.state.selectedRate;
    return this.props.apiCall('addRobotKeys', d).then(r => {
      if( r.status === 'error' ) return r;
      this._closePopup();
      this.props.okCallback(rate, 2);
      return r;
    });
  }

  _onExtendSubmit = d => {
    var rate = this.state.selectedRate;
    return this.props.apiCall('extendRobot', d).then(r => {
      if( r.status === 'error' ) return r;
      this._closePopup();
      this.props.okCallback(rate, 3);
      return r;
    });
  }

}
