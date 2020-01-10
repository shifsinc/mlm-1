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
      popup: null
    }
    this.rate = null;
  }

  render(){
    return (<>
      <PageView callback={ p => this.props.apiCall('admin/getFiles', { section: this.props.section, ...p }) }
        callbackArgs={ this.state.rand } componentProps={{ _admin: true, _editClick: this._editClick, _deleteClick: this._deleteClick }}
        component={ FilesView } onPageCount={ 10 }></PageView>

      <Link className="button admin__add-button" onClick={ () => this.setState({ popup: 0 }) }>Добавить новый</Link>

      <ViewSelect active={ this.state.popup }>
        <AddContentPopup formTitle="Добавить файл" onClose={ () => this.setState({ popup: null }) }
            submitCallback={ this._onSubmit }>

          <Input attr={{ name: 'title' }} label="Название для публикации"></Input>
          <textarea name="descr" placeholder="Описание файла"></textarea>
          <SelectInput label="Тариф" options={ RATES_TITLES } onSelect={ n => this.rate = n + 1 }></SelectInput>
          <AttachFiles name="file" title="Прикрепить"></AttachFiles>

          </AddContentPopup>
        </ViewSelect>
    </>);
  }

  _editClick = d => {

  }
  _deleteClick = d => {

  }

  _onSubmit = data => {
    data.rate = this.rate;
    var resolve;
    this.props.uploadFile('admin/uploadFile', data.file[0]).then(r => {
      if( r.status === 'error' ) resolve(r);
      delete data.file;
      var p = Object.assign({}, r.result, { section: this.props.section }, { ...data });
      this.props.apiCall('admin/addFile', p).then(r => {
        if( r.status !== 'error' ) this.setState({ popup: null, rand: Math.random() });
        resolve(r);
      });
    });
    return new Promise((res, rej) => resolve = res);
  }

}
