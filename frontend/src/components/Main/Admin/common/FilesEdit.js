import React from 'react';
import './FilesEdit.css'

import PageView from '../../../common/PageView.js'
import Link from '../../../common/Link.js'
import Input from '../../../common/Input.js'
import SelectInput from '../../../common/SelectInput.js'
import ViewSelect from '../../../common/ViewSelect.js'
import FilesView from '../../common/FilesView.js'
import AddContentPopup from './AddContentPopup.js'
import AttachFiles from './AttachFiles.js'
import { RATES_TITLES } from '../../../../const.js'

export default class extends React.Component {
  constructor(props){/*apiCall, uploadFile, section*/
    super(props);
    this.state = {
      popup: null,
      editData: {}
    }
    this.rate = null;
    this.editRate = null;
  }

  render(){
    var d = this.state.editData;
    return (<>
      <PageView callback={ p => this.props.apiCall('admin/getFiles', { section: this.props.section, ...p }) }
        callbackArgs={ this.state.rand } componentProps={{ _admin: true, _editClick: this._editClick, _deleteClick: this._deleteClick }}
        component={ FilesView } onPageCount={ 10 }></PageView>

      <Link className="button admin__add-button" onClick={ () => this.setState({ popup: 0 }) }>Добавить новый</Link>

      <ViewSelect active={ this.state.popup }>
        <AddContentPopup formTitle="Добавить файл" onClose={ () => this.setState({ popup: null }) }
            submitCallback={ this._onAddSubmit }>

          <Input attr={{ name: 'title' }} label="Название для публикации"></Input>
          <Input attr={{ name: 'descr' }} label="Описание файла" textarea></Input>
          <SelectInput label="Тариф" options={ RATES_TITLES } onSelect={ n => this.rate = n }></SelectInput>
          <AttachFiles name="file" title="Прикрепить"></AttachFiles>

          </AddContentPopup>

          <AddContentPopup formTitle="Редактировать файл" onClose={ () => this.setState({ popup: null }) }
              submitCallback={ this._onEditSubmit }>

              <Input attr={{ name: 'title' }} label="Название для публикации" startValue={ d.file_title }></Input>
              <Input attr={{ name: 'descr' }} label="Описание файла" startValue={ d.file_descr } textarea></Input>
              <SelectInput label="Тариф" options={ RATES_TITLES } onSelect={ n => this.editRate = n }
               startValue={ d.file_rate+0 }></SelectInput>

            </AddContentPopup>
        </ViewSelect>
    </>);
  }

  _deleteClick = d => {
    this.props.apiCall('admin/deleteFile', { file_id: d.file_id }).then(r => {
      if( r.status !== 'error' ) this.setState({ rand: Math.random() });
    });
  }

  _editClick = d => {
    this.setState({ edit: true, editData: d, popup: 1 });
    this.editRate = d.file_rate;
  }

  _onAddSubmit = data => {
    if( !data.file.length ) return;
    data.rate = this.rate;
    var file = data.file[0];
    var resolve;
    this.props.uploadFile('admin/uploadFile', file.slice(), { filename: file.name }).then(r => {
      if( r.status === 'error' ) resolve(r);
      delete data.file;
      var p = Object.assign({}, r.result, { section: this.props.section }, data);
      this.props.apiCall('admin/addFile', p).then(r => {
        if( r.status !== 'error' ) this.setState({ popup: null, rand: Math.random() });
        resolve(r);
      });
    });
    return new Promise((res, rej) => resolve = res);
  }

  _onEditSubmit = data => {
    data.file_id = this.state.editData.file_id;
    data.rate = this.editRate;
    this.props.apiCall('admin/editFile', data).then(r => {
      if( r.status !== 'error' ) this.setState({ popup: null, rand: Math.random() });
    });
  }

}
