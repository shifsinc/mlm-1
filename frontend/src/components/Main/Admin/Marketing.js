import React from 'react';
import './common/common.css'

import PageView from '../../common/PageView.js'
import FilesView from '../common/FilesView.js'
import Link from '../../common/Link.js'
import Input from '../../common/Input.js'
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
      popup = (<AddFilePopup title="НОВЫЙ ФАЙЛ МАРКЕТИНГА" onClose={ () => this.setState({ popupDisplay: 0 }) }
        submitCallback={ this._addFile }></AddFilePopup>);
    }

    return (<div className="admin__marketing">
      <PageView callback={ p => this.props.apiCall('getFiles', { section: 'marketing', ...p }).then(r => r.result ? r.result : {}) }
        component={ _viewFiles } componentProps={{ newClick: this._newClick }} onPageCount={ 5 }></PageView>
        { popup }
    </div>);
  }

  _newClick = n => {
    this.setState({ popupDisplay: n });
  }

  _addFile = data => {
    console.log(data)
  }

}

function _viewFiles(props){
  var data = props.data ? props.data : [];
  return (<div className="admin__marketing__files">
      <div className="admin__block">
        <h4>Файлы маркетинга</h4>
        <FilesView data={ data } admin={ true }></FilesView>

        <Link className="button admin__button" onClick={ () => props.newClick(1) }>Добавить новый</Link>
      </div>
    </div>);
}
