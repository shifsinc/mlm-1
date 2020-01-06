import React from 'react';
import './Events.css'
import '../common/common.css'

import PageView from '../../common/PageView.js'
import Table from '../../common/Table.js'
import Link from '../../common/Link.js'
import ViewSelect from '../../common/ViewSelect.js'
import Popup from '../../common/Popup.js'
import { formatDate } from '../../../utils.js'
import { EVENTS_TITLES } from '../../../const.js'

export default class extends React.Component {
  constructor(props){/*apiCall*/
    super(props);
    this.state = {
      popup: null,
      popupData: {}
    }
  }

  render(){
    var popupData = this.state.popupData;
    return (<div className="admin__events">
    <PageView onPageCount={ 15 }
      component={ _view }  componentProps={{ infoClick: this._infoClick }}
      callback={ p => this.props.apiCall('admin/getEvents', p).then(r => r.result ? r.result : []) }>
    </PageView>

      <ViewSelect active={ this.state.popup }>
        <Popup className="admin__events__popup" onClose={ () => this.setState({ popup: null }) }>
          <h2>{ EVENTS_TITLES[ popupData.event_type ] }</h2>
          <Table>
            { ( popupData.event_type === 'payment' || popupData.event_type === 'withdraw' ) ? (
              <tr><td>Сумма</td><td>{ popupData.tr_platform_amount } YT</td></tr>
            ) : undefined }

            <tr><td>Рефер</td><td>{ popupData.user_name } { popupData.user_surname }</td></tr>

            { popupData.event_type === 'new_status' ? (
              <tr><td>Новый статус</td><td>{ popupData.user_status }</td></tr>
            ) : undefined }

            { popupData.event_type === 'bonus_start' ? (
              <tr><td>Тариф</td><td>{ popupData.user_rate }</td></tr>
            ) : undefined }

            <tr><td>Дата и время</td><td>{ formatDate(popupData.tr_dt) }</td></tr>

            { popupData.event_type === 'withdraw' ? (<>
              <tr><td>Сумма вывода</td><td>{ popupData.tr_real_amount } ETH</td></tr>
              <tr><td>Номер кошелька</td><td>{ popupData.account_ethereum }</td></tr>
              <tr>
                <td>Статус</td>
                <td><div className={ 'transaction-status-' + popupData.tr_status }>{ popupData.tr_status.toUpperCase() }</div></td>
              </tr>
            </>) : undefined }

          </Table>
          { popupData.event_type === 'withdraw' ? (<div className="admin__events__popup__cont">
            <Link className="button admin__events__popup__button"
              onClick={ () => {
                this.props.apiCall('admin/confirmTransaction', { tr_id: popupData.tr_id });
                this.setState({ popup: null });
              }}>Подтвердить</Link>

            <Link className="button admin__events__popup__button"
            onClick={ () => {
              this.props.apiCall('admin/rejectTransaction', { tr_id: popupData.tr_id });
              this.setState({ popup: null });
            }}>Отказать</Link>
          </div>) : undefined }
        </Popup>
      </ViewSelect>
    </div>);
  }

  _infoClick = item => {
    this.setState({ popup: 0, popupData: item });
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
