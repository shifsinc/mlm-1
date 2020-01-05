import React from 'react';
import './common/common.css'

import PageView from '../../common/PageView.js'
import FilesView from '../common/FilesView.js'
import Link from '../../common/Link.js'
import Input from '../../common/Input.js'
import AddContentPopup from './common/AddContentPopup.js'
import AddFilePopup from './common/AddFilePopup.js'
import { formatDate } from '../../../utils.js'

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
      
      popup = (<AddFilePopup title="НОВЫЙ ФАЙЛ РОБОТА" onClose={ () => this.setState({ popupDisplay: 0 }) }
        submitCallback={ this._addFile }></AddFilePopup>);

    } else if( this.state.popupDisplay === 2 ){

      popup = (<AddContentPopup formTitle="ОБНОВЛЕНИЕ РОБОТА" onClose={ () => this.setState({ popupDisplay: 0 }) }
          submitCallback={ this._addUpdate }>
          <textarea name="descr" placeholder="Описание файла"></textarea>
        </AddContentPopup>);

    }

    return (<div className="admin__robot">
      <PageView callback={ p => this.props.apiCall('getRobotFiles', p).then(r => r.result ? r.result : {}) }
        component={ _viewFiles } componentProps={{ newClick: this._newClick }} onPageCount={ 5 }></PageView>
      <PageView callback={ p => this.props.apiCall('getRobotUpdates', p).then(r => r.result ? r.result : {}) }
        component={ _viewUpdates } componentProps={{ newClick: this._newClick }} onPageCount={ 5 }></PageView>
      { popup }
    </div>);
  }

  _newClick = n => {
    this.setState({ popupDisplay: n });
  }

  _addFile = data => {
    console.log(data)
  }
  _addUpdate = data => {
    console.log(data)
  }

}

function _viewFiles(props){
  var data = props.data ? props.data : [];
  return (<div className="admin__robot__files">
      <div className="admin__block">
        <h4>Файлы робота</h4>

          <FilesView data={ data } admin={ true }></FilesView>

          <Link className="button admin__button" onClick={ () => props.newClick(1) }>Добавить новый</Link>

      </div>
    </div>);
}

function _viewUpdates(props){
  var data = props.data ? props.data : [];
  return (<div className="admin__robot__updates">
    <div className="admin__block">
      <h4>Обновления робота</h4>
        {
          data.map((d, i) => {
            return (<div className="admin__robot__updates__item">
                <div>{ formatDate( d.news_dt ) }</div>
                <div>{ d.news_text }</div>
              </div>);
          })
        }
        <Link className="button admin__button" onClick={ () => props.newClick(2) }>Добавить новый</Link>
    </div>
  </div>);
}
