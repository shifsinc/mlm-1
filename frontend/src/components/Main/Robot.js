import React from 'react';
import './Robot.css'
import Keys from './Robot/Keys.js'
import Files from './Robot/Files.js'
import Updates from './Robot/Updates.js'
import Purchase from './Robot/Purchase.js'

export default function(props) {/*updateLocation*/
  var data = props.apiCall('_').then(r => r.result ? r.result : []);
  return (
    <div className="main__content robot">
      <Keys dataSrc={ data }></Keys>
      <div className="robot__cont">
        <Files dataSrc={ data }></Files>
        <Updates dataSrc={ data }></Updates>
      </div>
      <Purchase dataSrc={ data }></Purchase>
    </div>
  );
}
