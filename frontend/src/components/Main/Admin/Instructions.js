import React from 'react';

import PageView from '../../common/PageView.js'
import Link from '../../common/Link.js'
import Input from '../../common/Input.js'
import SelectInput from '../../common/SelectInput.js'
import ViewSelect from '../../common/ViewSelect.js'
import FilesView from '../common/FilesView.js'
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
  }

  render(){
    return (<div className="admin__instructions">
      <div className="interface-block admin__first-block">
        <h4>Файлы инструкций</h4>
        <FilesEdit { ...this.props }  section="instructions"></FilesEdit>
      </div>

      <div className="interface-block">
        <h4>Видео</h4>
        <PageView component={ VideosView } onPageCount={ 8 }
          componentProps={{ _admin: true, _editClick: this._editClick, _deleteClick: this._deleteClick }}
          callback={ p => this.props.apiCall('getFiles', { section: 'videos', ...p })
            .then(r => {
              if( r.result ) r.result.data = r.result.data.map(f => f.file_descr);
              return r;
            }) } callbackArgs={ this.state.rand }>
        </PageView>
        <Link className="button" onClick={ () => this.setState({ popup: 0 }) }>Добавить новый</Link>
      </div>

      <ViewSelect active={ this.state.popup }>
        <AddContentPopup formTitle="НОВОЕ ВИДЕО" onClose={ this._closePopup }
          submitCallback={ this._onVideoSubmit }>
            <textarea name="descr" placeholder="Вставьте код youtube"></textarea>
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

  _onVideoSubmit = data => {
    if( !data.descr ) return;
    data.rate = RATES_TITLES.indexOf( data.rate );
    return this.props.apiCall('admin/addFile', { section: 'videos', ...data }).then(r => {
      if( r.status !== 'error' ) this.setState({ popup: null, rand: Math.random() });
      return r;
    });
  }

}
