import React from 'react';
import './Events.css'
import '../common/common.css'

import PageView from '../../common/PageView.js'
import Table from '../../common/Table.js'
import Link from '../../common/Link.js'
import ViewSelect from '../../common/ViewSelect.js'
import Popup from '../../common/Popup.js'
import { formatDate } from '../../../utils.js'
import { EVENTS_TITLES, STATUS_TITLES } from '../../../const.js'

async function sendEthTransaction(to, value, callback){
  var eth = window.ethereum;
  if( !eth ) return;
  try {
    await eth.enable();
  } catch(e){alert(e.message); return;}
  if( !eth.selectedAddress ) return;

  var addr = eth.selectedAddress;
  const transactionParameters = {
    to,
    from: addr,
    value: window.BigInt( value * 1000000000000000000).toString(16)
  }
  eth.sendAsync({
    method: 'eth_sendTransaction',
    params: [ transactionParameters ],
    from: addr
  }, callback)
}

export default class extends React.Component {
  constructor(props){/*apiCall*/
    super(props);
    this.state = {
      popup: null,
      eventData: {}
    }
  }

  render(){
    var eventData = this.state.eventData;
    return (<div className="admin__events interface-block admin__first-block">
    <PageView onPageCount={ 15 }
      component={ _view }  componentProps={{ infoClick: this._infoClick }}
      callback={ p => this.props.apiCall('admin/getEvents', p) }>
    </PageView>

      <ViewSelect active={ this.state.popup }>
        <Popup className="admin__events__popup" onClose={ () => this._closePopup() }>
          <h2>{ EVENTS_TITLES[ eventData.event_type ] }</h2>
          <Table>
            { ( eventData.event_type === 'payment' || eventData.event_type === 'withdraw' ) ? (
              <tr><td>Сумма</td><td>{ eventData.tr_platform_amount } YT</td></tr>
            ) : undefined }

            <tr><td>Рефер</td><td>{ eventData.user_name } { eventData.user_surname }</td></tr>

            { eventData.event_type === 'new_status' ? (
              <tr><td>Новый статус</td><td>{ STATUS_TITLES[ eventData.user_status ] }</td></tr>
            ) : undefined }

            { eventData.event_type === 'bonus_start' ? (
              <tr><td>Тариф</td><td>{ eventData.user_rate }</td></tr>
            ) : undefined }

            <tr><td>Дата и время</td><td>{ formatDate(eventData.event_dt) }</td></tr>

            { eventData.event_type === 'withdraw' ? (<>
              <tr><td>Сумма вывода</td><td>{ eventData.tr_real_amount } ETH</td></tr>
              <tr><td>Номер кошелька</td><td>{ eventData.account_ethereum }</td></tr>
              <tr>
                <td>Статус</td>
                <td><div className={ 'transaction-status-' + eventData.tr_status }>{ eventData.tr_status.toUpperCase() }</div></td>
              </tr>
            </>) : undefined }

          </Table>
          { ( eventData.event_type === 'withdraw' && eventData.tr_status === 'wait' ) ? (<div className="admin__events__popup__cont">
            <Link className="button admin__events__popup__button"
              onClick={ this._onTransactionConfirm }>Подтвердить</Link>

            <Link className="button admin__events__popup__button"
            onClick={ this._onTransactionReject }>Отказать</Link>
          </div>) : undefined }
        </Popup>
      </ViewSelect>
    </div>);
  }

  _closePopup = () => this.setState({ popup: null });

  _infoClick = item => {
    this.setState({ popup: 0, eventData: item });
  }

  _onTransactionConfirm = () => {
    var d = this.state.eventData;
    if( d.tr_status !== 'wait' ) return;
    sendEthTransaction(d.account_ethereum, d.tr_real_amount, (err, info) => {
      if(err) return alert(err.message);
      this.props.apiCall('admin/confirmTransaction', { tr_id: d.tr_id })
        .then(r => r.status === 'ok' && this._closePopup())
      })
  }

  _onTransactionReject = () => {
    var d = this.state.eventData;
    if( d.tr_status !== 'wait' ) return;
    this.props.apiCall('admin/rejectTransaction', { tr_id: d.tr_id })
      .then(r => r.status === 'ok' && this._closePopup());
  }
}

function _view(props){/*infoClick*/
  var data = props.data ? props.data : [];
  return (
      <Table className="admin__events__list" titles={[ 'ДАТА И ВРЕМЯ', 'СОБЫТИЕ', '', '' ]}>
      {
        data.map((d, i) => {
          return (<tr key={ i }>
            <td>{ formatDate(d.event_dt) }</td>
            <td>{ EVENTS_TITLES[ d.event_type ] }</td>
            <td className="admin__events__list__more" onClick={ () => props.infoClick(d) }>Подробности</td>
            <td><div className={ d.tr_status ? ('transaction-status-' + d.tr_status) : undefined }></div></td>
          </tr>);
        })
      }
    </Table>);
}
