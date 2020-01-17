import React from 'react';
import './Analytics.css'

import SelectInput from '../../common/SelectInput.js'
import Link from '../../common/Link.js'
import PageView from '../../common/PageView.js'
import Table from '../../common/Table.js'

const USER_SORTS = [ 'withdraws' ];

export default class extends React.Component {
  constructor(props){/*apiCall*/
    super(props);
    this.state = {
      analytics: { rate_stats: [] },
      listOpened: false,
      userSort: USER_SORTS[0]
    }

    props.apiCall('admin/getAnalytics').then( r => {
      if( r.status === 'error' ) return;
      this.setState({ analytics: r.result });
    });
  }
  render(){
    var analytics = this.state.analytics;
    return (<div className="admin__analytics">
      <div className="admin__analytics__list interface-block admin__first-block">
        <div className="admin__analytics__cont">
          <SelectInput label="Сортировка пользователей" options={[ 'Пользователи, которые вывели больше всех YT' ]}
            onSelect={ ind => this.setState({ userSort: USER_SORTS[ind], listOpened: true }) }>
          </SelectInput>

          <Link className="button" onClick={ () => this.setState({ listOpened: !this.state.listOpened }) }>
            { this.state.listOpened ? 'СКРЫТЬ' : 'ПОКАЗАТЬ' }
          </Link>
        </div>

        { this.state.listOpened ? (
        <PageView component={ _view }  componentProps={{ userClick: this._userClick }}
          onPageCount={ 15 }
          callback={ p => this.props.apiCall('admin/sortUsers', p) }
          callbackArgs={{ sort: this.state.userSort }}></PageView>
        ) : undefined }

      </div>
      <div className="admin__analytics__stats">
        <div className="admin__analytics__stats__item interface-block">
          <div>Всего пользователей</div><div>{ analytics.users_total }</div>
        </div>
        <div className="admin__analytics__stats__item interface-block">
          <div>Приобрели тариф впервые</div><div>{ analytics.users_rate_first }</div>
        </div>
        <div className="admin__analytics__stats__item interface-block">
          <div>Выведенных из системы YT</div><div>{ analytics.withdraws_sum }</div>
        </div>
        <div className="admin__analytics__stats__item interface-block">
          <div>Купили тариф CLIENT</div><div>{ analytics.rate_stats[1] }</div>
        </div>
        <div className="admin__analytics__stats__item interface-block">
          <div>Купили тариф LIGHT</div><div>{ analytics.rate_stats[2] }</div>
        </div>
        <div className="admin__analytics__stats__item interface-block">
          <div>Купили тариф ADVANCED</div><div>{ analytics.rate_stats[3] }</div>
        </div>
        <div className="admin__analytics__stats__item interface-block">
          <div>Купили тариф MASTER</div><div>{ analytics.rate_stats[4] }</div>
        </div>
      </div>
    </div>);
  }

  _userClick = u => {
    this.props.showUserCard(u.user_id);
  }

}

function _view(props){/*userClick*/
  var data = props.data ? props.data : [];
  return (<Table className="admin__analytics__list" titles={[ 'МЕСТО', 'ПОЛЬЗОВАТЕЛЬ', 'YT ВЫВЕДЕНО' ]}>
      {
        data.map((d, i) => {
          return (<tr key={ i }>
            <td>{ props.offset + i + 1 }</td>
            <td onClick={ () => props.userClick(d) }>{ d.user_name } { d.user_surname }</td>
            <td>{ d.account_withdraws }</td>
          </tr>);
        })
      }
    </Table>);
}
