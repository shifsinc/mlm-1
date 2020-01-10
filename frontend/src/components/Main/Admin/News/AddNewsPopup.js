import React from 'react';
import './AddNewsPopup.css'

import Input from '../../../common/Input.js'
import SelectInput from '../../../common/SelectInput.js'
import AddContentPopup from '../common/AddContentPopup.js'
import AttachFiles from '../common/AttachFiles.js'
import { RATES_TITLES } from '../../../../const.js'

export default class extends React.Component {
  constructor(props){/*apiCall, onClose, formTitle, section*/
    super(props);
    this.state = {
      videos: []
    }
    this.rate = null
  }

  render(){
    return (<AddContentPopup formTitle={ this.props.formTitle } className="admin__news__popup"
      onClose={ this.props.onClose } submitCallback={ this._onSubmit }>
        <Input label="Заголовок" attr={{ name: 'title' }}></Input>

        <textarea name="text" placeholder="Текст записи"></textarea>

        {
          this.state.videos.map((v, i) => <textarea key={ i } onChange={ e => {
            var videos = this.state.videos;
            videos[i] = e.target.value;
            this.setState({ videos })
          }} value={ v } placeholder="Вставьте код youtube"/>)
        }

        <SelectInput label="Тариф" options={ RATES_TITLES }
          onSelect={ n => this.rate = n }></SelectInput>

        <div className="admin__news__popup__buttons">
          <AttachFiles name="images" title="Добавить фото"></AttachFiles>
          <div className="button button_inactive admin__news__popup__add-video"
            onClick={ () => this.setState({ videos: this.state.videos.concat([ '' ]) }) }>Добавить видео</div>
        </div>
    </AddContentPopup>);
    }

    _onSubmit = d => {
      d.rate = this.rate;
      Promise.all( d.images.map(img => this.props.uploadFile('admin/uploadFile', img)) ).then(r => {
        d.images = r.map(f => f.result.filename);
        this.props.apiCall('admin/addNews', { section: this.props.section, ...d, videos: this.state.videos }).then(r => {
          if( r.status !== 'error' ) this.props.onClose();
        });
      });
    }

}
