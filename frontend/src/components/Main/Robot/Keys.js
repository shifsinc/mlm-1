import React from 'react';
import './Keys.css'
import Table from '../../common/Table.js'
import ViewSelect from '../../common/ViewSelect.js'
import AddRobotKeysPopup from '../common/AddRobotKeysPopup.js'
import { formatDate } from '../../../utils.js'

export default class extends React.Component {
  constructor(props){/*apiCall, onChange, data, info*/
    super(props);
    this.state = {
      popup: null,
      popupData: {}
    }
  }

  render(){
    var data = this.props.data ? this.props.data : [];
    return (<>
      <div className="edit-button" onClick={ () => this.setState({
          popup: 0,
          popupData: data.map(d => d.key_account),
      }) }></div>
      <Table titles={ [ 'НОМЕР СЧЕТА', 'МАКС. ДЕПОЗИТ', 'ЛИЦЕНЗИЯ', 'ДЕЙСТВИТЕЛЬНА ДО', 'КЛЮЧ' ] }>
        {
          data.map((d, i) => {
            return (<tr key={ i }>
              <td>{ d.key_account }</td>
              <td>{ '$ ' + d.key_max_deposit }</td>
              <td>{ ( new Date(d.key_valid_dt) - new Date() > 0 ) ? 'Активна' : 'Не активна' }</td>
              <td>{ formatDate( d.key_valid_dt ) }</td>
              <td>{ d.key_key }</td>
            </tr>);
          })
        }
      </Table>

      <ViewSelect active={ this.state.popup }>
        <AddRobotKeysPopup title="РЕДАКТИРОВАНИЕ СЧЕТОВ"
          onClose={ this._closePopup } onSubmit={ this._onEditSubmit }
          extraInput={ this.props.info.user_rate >= 3 } data={ this.state.popupData }>
        </AddRobotKeysPopup>
      </ViewSelect>
    </>);
  }

  _closePopup = () => this.setState({ popup: null });

  _onEditSubmit = d => {
    return this.props.apiCall('addRobotKeys', d).then(r => {
      if( r.status === 'error' ) return r;
      this._closePopup();
      if( this.props.onChange ) this.props.onChange();
      return r;
    });
  }
}
