import React from 'react';
import './Users.css'

import Input from '../../common/Input.js'
import PageView from '../../common/PageView.js'
import Table from '../../common/Table.js'
import Link from '../../common/Link.js'
import ViewSelect from '../../common/ViewSelect.js'
import Popup from '../../common/Popup.js'
import UserInfo from '../common/UserInfo.js'
import { formatDate, getUserCardInfo } from '../../../utils.js'
import { RATES_TITLES } from '../../../const.js'

export default class extends React.Component {
  constructor(props){/*apiCall*/
    super(props);
    this.state = {
      pattern: '',
      view: 0,
      userData: {},
      popup: null
    }
  }

  render(){
    return (<div className="admin__users">

        <ViewSelect active={ this.state.view }>

          <><Input label="Поиск пользователей" attr={{ value: this.state.pattern, onChange: e => {
            this.setState({ pattern: e.target.value });
          } }}></Input>

          <PageView component={ _view }  componentProps={{ userClick: this._userClick }} onPageCount={ 15 }
            callback={ p => this.props.apiCall('admin/searchUsers', p).then(r => r.result ? r.result : []) }
            callbackArgs={{ pattern: this.state.pattern }}></PageView></>

          <div className="admin__users__user-info">
            <div className="admin__users__user-info__top">
              <Link className="button" onClick={ () => this.setState({ view: 0 }) }>Назад</Link>
              <Link className="button">ЗАБЛОКИРОВАТЬ</Link>
            </div>
            <UserInfo data={ this.state.userData }></UserInfo>
            <div className="admin__users__user-info__bottom">
              <Link className="button" onClick={ () => this.setState({ popup: 0 }) }>НАЧИСЛИТЬ YT</Link>
              <Link className="button" onClick={ () => this.setState({ popup: 1 }) }>ИЗМЕНИТЬ СТАТУС</Link>
              <Link className="button" onClick={ () => this.setState({ popup: 2 }) }>ИЗМЕНИТЬ ТАРИФ</Link>
            </div>
          </div>

        </ViewSelect>
        <ViewSelect active={ this.state.popup }>
          <Popup onClose={ () => this.setState({ popup: null }) }>
            1
          </Popup>
          <Popup onClose={ () => this.setState({ popup: null }) }>
            2
          </Popup>
          <Popup onClose={ () => this.setState({ popup: null }) }>
            3
          </Popup>
        </ViewSelect>
    </div>);
  }

  _userClick = d => {
    getUserCardInfo(this.props.apiCall, d.user_id, r => {
      if( r.status === 'error' ) return;
      this.setState({ userData: r, view: 1 });
    });
  }
}

function _view(props){/*userClick*/
  var data = props.data ? props.data : [];
  return (
      <Table className="admin__users__list" titles={[ 'ИМЯ ФАМИЛИЯ', 'ЗАРЕГЕСТРИРОВАН', 'ТАРИФ','РЕФЕРАЛОВ В ПРАВОЙ/ЛЕВОЙ НОГЕ' ]}>
      {
        data.map((d, i) => {
          return (<tr key={ i }>
            <td onClick={ () => props.userClick(d) }>{ d.user_name } { d.user_surname }</td>
            <td>{ formatDate( d.user_dt ) }</td>
            <td>{ RATES_TITLES[ d.user_rate ] }</td>
            <td>{ d.stats_left_referals } / { d.stats_right_referals }</td>
          </tr>);
        })
      }
    </Table>);
}
