import React from 'react';

import PageView from '../../common/PageView.js'
import FilesView from '../common/FilesView.js'
import Link from '../../common/Link.js'
import Input from '../../common/Input.js'
import SelectInput from '../../common/SelectInput.js'
import ViewSelect from '../../common/ViewSelect.js'
import AddContentPopup from './common/AddContentPopup.js'
import RobotUpdates from '../common/RobotUpdates.js'
import FilesEdit from './common/FilesEdit.js'
import { formatDate } from '../../../utils.js'
import { RATES_TITLES } from '../../../const.js'

export default class extends React.Component {
  constructor(props){/*apiCall*/
    super(props);
    this.state = {
      popup: null
    }
  }

  render(){
    return (<div className="admin__robot">
      <div className="interface-block admin__first-block">
        <h4>Файлы робота</h4>
        <FilesEdit { ...this.props }  section="robot"></FilesEdit>
      </div>

      <div className="interface-block">
        <h4>Обновления робота</h4>
        <PageView callback={ p => this.props.apiCall('admin/getNews', { section: 'robot_update', ...p }) }
          callbackArgs={ this.state.rand } onPageCount={ 5 }
          component={ RobotUpdates }
          componentProps={{ _admin: true, _editClick: this._editClick, _deleteClick: this._deleteClick }}>
        </PageView>
        <Link className="button admin__add-button" onClick={ () => this.setState({ popup: 0 }) }>Добавить новый</Link>
      </div>

      <ViewSelect active={ this.state.popup }>
        <AddContentPopup formTitle="ОБНОВЛЕНИЕ РОБОТА" onClose={ this._closePopup }
            submitCallback={ this._onUpdateSubmit }>
            <textarea name="text" placeholder="Описание файла"></textarea>
            <SelectInput label="Тариф" name="rate" options={ RATES_TITLES }></SelectInput>
        </AddContentPopup>
      </ViewSelect>
    </div>);
  }

  _closePopup = () => {
    this.setState({ popup: null });
  }

  _editClick = d => {

  }

  _deleteClick = d => {

  }

  _onUpdateSubmit = data => {console.log(data)
    data.rate = RATES_TITLES.indexOf( data.rate );
    return this.props.apiCall('admin/addNews', { section: 'robot_update', ...data }).then(r => {
      if( r.status !== 'error' ) this.setState({ popup: null, rand: Math.random() });
      return r;
    });
  }
}
