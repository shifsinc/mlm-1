import React from 'react';
import './Users.css'

import Input from '../../common/Input.js'
import SelectInput from '../../common/SelectInput.js'
import PageView from '../../common/PageView.js'
import Table from '../../common/Table.js'
import Link from '../../common/Link.js'
import Form from '../../common/Form.js'
import ViewSelect from '../../common/ViewSelect.js'
import Popup from '../../common/Popup.js'
import UserInfo from '../common/UserInfo.js'
import { formatDate, getUserCardInfo } from '../../../utils.js'
import { RATES_TITLES, STATUS_TITLES, passwordRegexp } from '../../../const.js'

export default class extends React.Component {
  constructor(props){/*apiCall*/
    super(props);
    this.state = {
      pattern: '',
      view: 0,
      userData: {},
      popup: null,
      selectedRate: null,
      selectedStatus: null
    }
  }

  render(){

    return (<div className="admin__users interface-block admin__first-block">

        <ViewSelect active={ this.state.view }>

          <><Input label="Поиск пользователей" attr={{ value: this.state.pattern, onChange: e => {
            this.setState({ pattern: e.target.value });
          } }}></Input>

          <PageView component={ _view }  componentProps={{ userClick: this._userClick }} onPageCount={ 15 }
            callback={ p => this.props.apiCall('admin/searchUsers', p) }
            callbackArgs={{ pattern: this.state.pattern }}></PageView></>

          <div className="admin__users__user-info">
            <div className="admin__users__user-info__top">
              <Link className="button" onClick={ this._backClick }>Назад</Link>
              <Link className="button" onClick={ this._blockClick }>
                { this.state.userData.user_blocked ? 'РАЗБЛОКИРОВАТЬ' : 'ЗАБЛОКИРОВАТЬ' }
              </Link>
            </div>
            <UserInfo data={ this.state.userData } userClick={ user_id => this._userClick({ user_id }) }></UserInfo>
            <div className="admin__users__user-info__bottom">
              <Link className="button" onClick={ this._addMoneyClick }>НАЧИСЛИТЬ YT</Link>
              <Link className="button" onClick={ this._changeStatusClick }>ИЗМЕНИТЬ СТАТУС</Link>
              <Link className="button" onClick={ this._changeRateClick }>ИЗМЕНИТЬ ТАРИФ</Link>
            </div>
          </div>

        </ViewSelect>

        <ViewSelect active={ this.state.popup }>
          <Popup onClose={ this._closePopup }>
            <Form className="admin__users__popup" formTitle="НАЧИСЛИТЬ YT"
              submitTitle="НАЧИСЛИТЬ" submitCallback={ this._addMoneySubmit }>

              <Input label="Сумма YT" regexp={ /^[0-9]+$/ } attr={{ name: 'amount' }}></Input>
              <Input label="Введите пароль" regexp={ passwordRegexp } attr={{ name: 'current_password', type: 'password' }}></Input>

            </Form>
          </Popup>

          <Popup onClose={ this._closePopup }>
            <Form className="admin__users__popup" formTitle="ИЗМЕНИТЬ СТАТУС"
              submitTitle="ПОДТВЕРДИТЬ" submitCallback={ this._changeStatusSubmit }>

              <SelectInput label="Статус" name="status" startValue={ this.state.userData.user_status - 1 }
                options={ STATUS_TITLES.slice(1) }></SelectInput>
              <Input label="Введите пароль" regexp={ passwordRegexp } attr={{ name: 'current_password', type: 'password' }}></Input>

            </Form>
          </Popup>

          <Popup onClose={ this._closePopup }>
            <Form className="admin__users__popup" formTitle="ИЗМЕНИТЬ ТАРИФ"
              submitTitle="ПОДТВЕРДИТЬ" submitCallback={ this._changeRateSubmit }>

              <SelectInput label="Тариф" name="rate" startValue={ this.state.userData.user_rate - 1 }
                options={ RATES_TITLES.slice(1) }></SelectInput>
              <Input label="Введите пароль" regexp={ passwordRegexp } attr={{ name: 'current_password', type: 'password' }}></Input>

            </Form>
          </Popup>
        </ViewSelect>
    </div>);
  }

  _backClick = () => {
    this.setState({ view: 0 })
  }
  _blockClick = () => {
    var userData = this.state.userData;
    this.props.apiCall('admin/blockUser', { user_id: userData.user_id, block: !userData.user_blocked }).then(r => {
      if( r.status !== 'error' )
        this.setState({ userData: Object.assign({}, this.state.userData, { user_blocked: r.result.user_blocked }) });

    });
  }
  _addMoneyClick = () => {
    this.setState({ popup: 0 })
  }
  _changeStatusClick = () => {
    this.setState({ popup: 1 })
  }
  _changeRateClick = () => {
    this.setState({ popup: 2 })
  }

  _addMoneySubmit = d => {
    return this.__submit('admin/addMoney', d);
  }
  _changeStatusSubmit = d => {
    d.status = STATUS_TITLES.indexOf( d.status );
    return this.__submit('admin/setUserStatus', d);
  }
  _changeRateSubmit = d => {
    d.rate = RATES_TITLES.indexOf( d.rate );
    return this.__submit('admin/setUserRate', d);
  }
  __submit = (method, d) => {
    return this.props.apiCall(method, Object.assign(d, { user_id: this.state.userData.user_id })).then(r => {
      if( r.status !== 'error' ) this.setState({ popup: null });
      return r;
    });
  }

  _closePopup = () => {
    this.setState({ popup: null })
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
      <Table className="admin__users__list" titles={[ 'ИМЯ ФАМИЛИЯ', 'ЗАРЕГИСТРИРОВАН', 'ТАРИФ','РЕФЕРАЛОВ В ПРАВОЙ/ЛЕВОЙ НОГЕ' ]}>
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
