import React from 'react';
import './Marketing.css'
import FilesView from './common/FilesView.js'

export default function(props) {/*updateLocation*/
  return (
    <div className="main__content">
      <FilesView title="Маркетинг"
        dataSrc={ props.apiCall('getFiles', { section: 'marketing' }).then(r => r.result ? r.result : []) }></FilesView>
    </div>
  );
}
