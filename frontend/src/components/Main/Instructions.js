import React from 'react';
import './Instructions.css'
import FilesView from './common/FilesView.js'

export default function(props) {/*updateLocation*/
  var checkResult = r => r.result ? r.result : [];
  return (
    <div className="main__content">
      <FilesView header="Инструкции"
        dataSrc={ props.apiCall('getFiles', { section: 'instructions' }).then( checkResult ) }></FilesView>
      <div></div>
    </div>
  );
}
