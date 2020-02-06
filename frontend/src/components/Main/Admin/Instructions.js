import React from 'react';

import PageView from '../../common/PageView.js'
import Link from '../../common/Link.js'
import Input from '../../common/Input.js'
import SelectInput from '../../common/SelectInput.js'
import ViewSelect from '../../common/ViewSelect.js'
import AddContentPopup from './common/AddContentPopup.js'
import VideosView from '../common/VideosView.js'
import FilesEdit from './common/FilesEdit.js'
import { RATES_TITLES } from '../../../const.js'

export default class extends React.Component {
  constructor(props){/*apiCall*/
    super(props);
    this.state = {
      popup: null
    }
    this.rate = null;
    this.rateEdit = null;
  }

  render(){
    var { editData } = this.state;
    return (<div className="admin__instructions">
      <div className="interface-block admin__first-block">
        <h4>Файлы инструкций</h4>
        <FilesEdit { ...this.props }  section="instructions"></FilesEdit>
      </div>

      <div className="interface-block">
        <h4>Видео</h4>
        <PageView component={ VideosView } onPageCount={ 8 }
          componentProps={{ _admin: true, _editClick: this._editClick, _deleteClick: this._deleteClick }}
          callback={ p => this.props.apiCall('admin/getFiles', { section: 'videos', ...p }) } callbackArgs={ this.state.rand }>
        </PageView>
        <Link className="button" onClick={ () => this.setState({ popup: 0 }) }>Добавить новый</Link>
      </div>

      <ViewSelect active={ this.state.popup }>
        <AddContentPopup formTitle="НОВОЕ ВИДЕО" onClose={ this._closePopup }
          submitCallback={ this._onAddSubmit }>
            <Input textarea attr={{ name: 'descr' }} label="Вставьте код youtube"></Input>
            <SelectInput label="Тариф" options={ RATES_TITLES }
              onSelect={ n => this.rate = n }></SelectInput>
        </AddContentPopup>

        <AddContentPopup formTitle="РЕДАКТИРОВАТЬ ВИДЕО" onClose={ this._closePopup }
          submitCallback={ this._onEditSubmit }>
            <Input textarea attr={{ name: 'descr' }} label="Вставьте код youtube"
              startValue={ editData ? editData.file_descr : undefined }></Input>
            <SelectInput label="Тариф" options={ RATES_TITLES }
              onSelect={ n => this.editRate = n } startValue={ editData ? editData.file_rate : undefined }></SelectInput>
        </AddContentPopup>
      </ViewSelect>
    </div>);
  }

  _closePopup = () => {
    this.setState({ popup: null });
  }

  _editClick = d => {
    this.setState({ popup: 1, editData: d });
  }

  _deleteClick = d => {
    this.props.apiCall('admin/deleteFile', { file_id: d.file_id }).then(r => {
      if( r.status !== 'error' ) this.setState({ rand: Math.random() });
    });
  }

  _onAddSubmit = data => {
    if( !data.descr ) return;
    data.rate = this.rate;
    return this.props.apiCall('admin/addFile', { section: 'videos', ...data }).then(r => {
      if( r.status !== 'error' ) this.setState({ popup: null, rand: Math.random() });
      return r;
    });
  }

  _onEditSubmit = data => {
    if( !data.descr ) return;
    data.rate = this.editRate;
    data.file_id = this.state.editData.file_id;
    return this.props.apiCall('admin/editFile', data).then(r => {
      if( r.status !== 'error' ) this.setState({ popup: null, rand: Math.random() });
      return r;
    });
  }

}
