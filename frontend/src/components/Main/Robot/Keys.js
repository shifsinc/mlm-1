import React from 'react';
import './Keys.css'
import Table from '../../common/Table.js'
import ViewSelect from '../../common/ViewSelect.js'
import AddRobotKeysPopup from '../common/AddRobotKeysPopup.js'
import { formatDate } from '../../../utils.js'

export default class extends React.Component {
  constructor(props){/*apiCall, onChange, data*/
    super(props);
    this.state = {
      popup: null,
      popupData: {},
      rate: null
    }
  }

  render(){
    var data = this.props.data ? this.props.data : [];
    return (<>
      <Table titles={ [ 'НОМЕР СЧЕТА', 'МАКС. ДЕПОЗИТ', 'ЛИЦЕНЗИЯ', 'ДЕЙСТВИТЕЛЬНА ДО' ] }>
        {
          data.map((d, i) => {
            return (<tr key={ i }>
              <td className="icon-before-text" onClick={ () => this.setState({
                  popup: 0,
                  popupData: data.map(d => d.key_account),
                  rate: d.key_rate
              }) }>{ d.key_account }</td>
              <td>{ '$ ' + d.key_max_deposit }</td>
              <td>{ ( new Date(d.key_valid_dt) - new Date() > 0 ) ? 'Активна' : 'Не активна' }</td>
              <td>{ formatDate( d.key_valid_dt ) }</td>
            </tr>);
          })
        }
      </Table>

      <ViewSelect active={ this.state.popup }>
        <AddRobotKeysPopup title="РЕДАКТИРОВАНИЕ СЧЕТОВ"
          onClose={ () => this.setState({ popup: null }) } onSubmit={ this._onSubmit }
          extraInput={ this.state.rate >= 3 } data={ this.state.popupData }>
        </AddRobotKeysPopup>
      </ViewSelect>
    </>);
  }

  _onSubmit = d => {
    return this.props.apiCall('addRobotKeys', { ...d, rate: this.state.rate }).then(r => {
      if( r.status === 'error' ) return r;
      this.setState({ popup: null });
      if( this.props.onChange ) this.props.onChange();
      return r;
    });
  }
}
