import React from 'react';
import './VideosView.css'
import Link from '../../common/Link.js'
import '../Admin/common.css'

export default function(props){/*data, _admin, _editClick, _deleteClick*/
  var data = props.data ? props.data : [];
  var className = '';
  if( data.length > 1 ) className = 'multiple';
  return data.map( (d, i) => {
    return (<div className="videos-view__video">
    { props._admin ?
      <div className="admin__controls">
        <Link className="admin__edit-button" onClick={ () => props._editClick(d) }></Link>
        <Link className="admin__delete-button" onClick={ () => props._deleteClick(d)}></Link>
      </div>
      : undefined }
    <div className={ 'videos-view__video__cont ' + className } dangerouslySetInnerHTML={{ __html: d.file_descr }}></div>
    </div>);
  });
}
