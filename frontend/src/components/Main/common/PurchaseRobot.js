import React from 'react';
import './PurchaseRobot.css'
import Link from '../../common/Link.js'
import Popup from '../../common/Popup.js'
import Form from '../../common/Form.js'
import Input from '../../common/Input.js'
import ViewSelect from '../../common/ViewSelect.js'
import AddRobotKeysPopup from './AddRobotKeysPopup.js'
import { RATES_PRICES, RATES_IMAGES, RATES_TITLES, RATES_COUNT, passwordRegexp } from '../../../const.js'

export default class extends React.Component {
  constructor(props){/*updateLocation, apiCall, noMoneyCallback, okCallback, data*/
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

    var rates = [];
    for( var ind = 1 ; ind <= RATES_COUNT ; ind++ ){
      var title;
      if( currentRate === null || ind < currentRate ) title = 'КУПИТЬ';
      else if( ind > currentRate ) title = 'ПОВЫСИТЬ';
      else title = 'ПРОДЛИТЬ';


      rates.push(<div key={ ind } className="purchase-robot__robot">
        <img src={ RATES_IMAGES[ ind ] } alt={ RATES_TITLES[ ind ] }/>
        <Link className="button button-client" onClick={ this._onBuyClick.bind(this, ind) }>
          { title }
        </Link>
      </div>);
    }

    return (<div className="purchase-robot">
      { rates }

      <ViewSelect active={ this.state.popup }>

        <Popup className="purchase-robot__popup-confirm" onClose={ () => this.setState({ popup: null }) }>
          <h3>КУПИТЬ ПАКЕТ "{ RATES_TITLES[ this.state.selectedRate ] }"?</h3>
          <div>С Вашего счета будет списано { RATES_PRICES[ this.state.selectedRate ] } YT</div>
          <Form submitTitle="Да"
            submitCallback={() => this.setState({ popup: 1 }) }>

            <Link className="button button-inactive purchase-robot__popup-confirm__button"
              onClick={ () => this.setState({ popup: null }) }>Нет</Link>

          </Form>
        </Popup>

        <AddRobotKeysPopup title="ПОЗДРАВЛЯЕМ С ПОКУПКОЙ РОБОТА!"
          onClose={ () => this.setState({ popup: null }) } onSubmit={ this._onSubmit } extraInput={ this.state.selectedRate >= 3 }>
        </AddRobotKeysPopup>

        <Popup className="purchase-robot__popup-save" onClose={ () => this.setState({ popup: null }) }>
          <Form formTitle="ЗАМЕНА РОБОТА" submitTitle="Сохранить" submitCallback={ this._onSubmit }>
            <Input label="Введите пароль" regexp={ passwordRegexp } attr={{ name: 'current_password', type: 'password' }}></Input>
          </Form>
        </Popup>

        <Popup className="purchase-robot__popup-save" onClose={ () => this.setState({ popup: null }) }>
          <Form formTitle="ПРОДЛЕНИЕ РОБОТА" submitTitle="Сохранить" submitCallback={ this._onSubmit }>
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
      this.props.okCallback(rate);
      return r;
    });
  }

  _onBuyClick = rate => {console.log(rate)
    this.props.apiCall('getUserBalance').then(r => {
      if( r.status === 'error' ) return;

      var price, curRate = this.state.currentRate ? this.state.currentRate : 0;
      if( rate <= curRate ) price = 0;
      else price = RATES_PRICES[ rate ] - RATES_PRICES[ curRate ];

      if( r.result.account_balance < price ) this.props.noMoneyCallback();
      else {
        var popup;
        if( rate > this.state.currentRate ) popup = 0;
        else if(rate < this.state.currentRate ) popup = 2;
        else popup = 3;
        this.setState({ popup, selectedRate: rate });
      }
    });
  }
}
