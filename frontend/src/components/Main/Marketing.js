import React from 'react';
import './Marketing.css'
import FilesView from './common/FilesView.js'

export default function(props) {/*updateLocation*/
  var checkResult = r => r.result ? r.result : [];
  return (
    <div className="main__content">
      <FilesView header="Маркетинг"
        dataSrc={ props.apiCall('getFiles', { section: 'marketing' }).then( checkResult ) }></FilesView>
    </div>
  );
}
