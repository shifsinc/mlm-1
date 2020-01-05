import React from 'react';

import PageView from '../../common/PageView.js'
import FilesView from '../common/FilesView.js'
import Link from '../../common/Link.js'
import Input from '../../common/Input.js'
import VideosView from '../common/VideosView.js'
import AddContentPopup from './common/AddContentPopup.js'
import AddFilePopup from './common/AddFilePopup.js'

export default class extends React.Component {
  constructor(props){/*apiCall*/
    super(props);
    this.state = {
      popupDisplay: 0
    }
  }

  render(){
    var popup;
    if( this.state.popupDisplay === 1 ){
      popup = (<AddFilePopup title="НОВЫЙ ФАЙЛ ИНСТРУКЦИИ" onClose={ () => this.setState({ popupDisplay: 0 }) }
        submitCallback={ this._addFile }></AddFilePopup>);

    } else if( this.state.popupDisplay === 2 ){

      popup = (<AddContentPopup formTitle="НОВОЕ ВИДЕО" onClose={ () => this.setState({ popupDisplay: 0 }) }
          submitCallback={ this._addVideo }>
          <textarea name="descr" placeholder="Вставьте код youtube"></textarea>
        </AddContentPopup>);

    }

    return (<div className="admin__instructions">
      <PageView component={ _viewFiles } componentProps={{ newClick: this._newClick }} onPageCount={ 5 }
        callback={ p => this.props.apiCall('getFiles', { section: 'instructions', ...p }).then(r => r.result ? r.result : {}) }
        ></PageView>
      <PageView component={ _viewVideos }  componentProps={{ newClick: this._newClick }} onPageCount={ 4 }
        callback={ p => this.props.apiCall('getFiles', { section: 'videos', ...p }).then(r => r.result ? r.result : {}) }
        ></PageView>
        { popup }
    </div>);
  }

  _newClick = n => {
    this.setState({ popupDisplay: n });
  }

  _addFile = data => {
    console.log(data)
  }
  _addVideo = data => {
    console.log(data)
  }

}

function _viewFiles(props){
  var data = props.data ? props.data : [];
  return (<div className="admin__instructions__files">
      <div className="admin__block">
        <h4>Файлы инструкций</h4>
        <FilesView data={ data } admin={ true }></FilesView>

        <Link className="button admin__button" onClick={ () => props.newClick(1) }>Добавить новый</Link>
      </div>
    </div>);
}

function _viewVideos(props){
  var data = props.data ? props.data : [];
  return (<div className="admin__instructions__videos">
      <div className="admin__block">
        <h4>Видео</h4>
        <VideosView data={ data } admin={ true }></VideosView>

        <Link className="button admin__button" onClick={ () => props.newClick(2) }>Добавить новый</Link>

      </div>
    </div>);
}
