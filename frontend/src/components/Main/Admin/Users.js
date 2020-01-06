import React from 'react';
import './Users.css'

import PageView from '../../common/PageView.js'
import Table from '../../common/Table.js'
import UserCard from '../common/UserCard.js'
import Input from '../../common/Input.js'
import ViewSelect from '../../common/ViewSelect.js'
import { formatDate } from '../../../utils.js'
import { RATES_TITLES } from '../../../const.js'

export default class extends React.Component {
  constructor(props){/*apiCall*/
    super(props);
    this.state = {
      pattern: '',
      popup: null,
      cardData: {}
    }
  }

  render(){
    return (<div className="admin__users">
      <Input label="Поиск пользователей" attr={{ value: this.state.pattern, onChange: e => {
        this.setState({ pattern: e.target.value });
      } }}></Input>

      <PageView component={ _view }  componentProps={{ userClick: this._userClick }} onPageCount={ 15 }
        callback={ p => this.props.apiCall('admin/searchUsers', p).then(r => r.result ? r.result : []) }
        callbackArgs={{ pattern: this.state.pattern }}></PageView>

        <ViewSelect active={ this.state.popup }>

          <UserCard data={ this.state.cardData }
            onClose={ () => this.setState({ popup: null }) }>
          </UserCard>

        </ViewSelect>
    </div>);
  }

  _userClick = d => {
    this.props.apiCall('getUserInfo', { user_id: d.user_id }).then(r => {
      if( r.status === 'error' ) return;
      this.setState({ cardData: r.result, popup: 0 });
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
