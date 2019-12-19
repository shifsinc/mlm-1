import React from 'react';
import './Instructions.css'
import FilesView from './common/FilesView.js'

export default function(props) {/*updateLocation*/
  return (
    <div className="main__content">
      <FilesView title="Инструкции"
        dataSrc={ props.apiCall('getFiles', { section: 'instructions' }).then(r => r.result ? r.result : []) }></FilesView>
    </div>
  );
}
