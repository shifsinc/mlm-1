import React from 'react';
import './AddNewsPopup.css'

import Input from '../../../common/Input.js'
import SelectInput from '../../../common/SelectInput.js'
import ViewSelect from '../../../common/ViewSelect.js'
import AddContentPopup from '../common/AddContentPopup.js'
import AttachFiles from '../common/AttachFiles.js'
import { RATES_TITLES } from '../../../../const.js'

export default class extends React.Component {
  constructor(props){/*apiCall, onClose, formTitle, section, editData*/
    super(props);
    this.state = {
      videos: []
    }
    this.rate = null;
  }

  render(){
    var { editData } = this.props;
    var method = editData ? this._onEditSubmit : this._onAddSubmit;

    return (<AddContentPopup formTitle={ this.props.formTitle } className="admin__news__popup"
      onClose={ this.props.onClose } submitCallback={ method }>
        <Input label="Заголовок" attr={{ name: 'title' }} startValue={ editData ? editData.news_title : undefined }></Input>

        <Input textarea label="Текст записи" attr={{ name: 'text' }}
          startValue={ editData ? editData.news_text : undefined }></Input>

        { !editData ? this.state.videos.map((v, i) => <Input textarea key={ i }
            attr={{ value: v, onChange: e => this._onVideoEdit(e, i) }} label="Вставьте код youtube"/>)
            : undefined
        }

        <SelectInput label="Тариф" options={ RATES_TITLES }
          onSelect={ n => this.rate = n } startValue={ editData ? editData.news_rate : undefined }></SelectInput>

        { !editData ? (
        <div className="admin__news__popup__buttons">
          <AttachFiles name="images" title="Добавить фото"></AttachFiles>
          <div className="button button_inactive admin__news__popup__add-video"
            onClick={ () => this.setState({ videos: this.state.videos.concat([ '' ]) }) }>Добавить видео</div>
        </div>
      ) : undefined }
    </AddContentPopup>);
    }

    _onVideoEdit = (e, i) => {
      var videos = this.state.videos;
      videos[i] = e.target.value;
      this.setState({ videos })
    }

    _onAddSubmit = d => {
      d.rate = this.rate;
      if( d.images ){
        var prom = Array.prototype.map.call( d.images, img => this.props.uploadFile('admin/uploadFile', img.slice()) );
        Promise.all( prom ).then(r => {
          d.images = r.map(f => f.result.filename);
          this._sendAddRequest(d);
        });
      } else this._sendAddRequest(d);

    }
    _sendAddRequest = d => {
      this.props.apiCall('admin/addNews', { section: this.props.section, ...d, videos: this.state.videos }).then(r => {
        if( r.status !== 'error' ) this.props.onClose();
        return r;
      });
    }

    _onEditSubmit = d => {
      d.news_id = this.props.editData.news_id;
      d.rate = this.rate;
      this.props.apiCall('admin/editNews', d).then(r => {
        if( r.status !== 'error' ) this.props.onClose();
        return r;
      });
    }


}
