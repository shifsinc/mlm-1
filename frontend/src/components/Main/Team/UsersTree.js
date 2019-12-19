import React from 'react';
import './UsersTree.css'
import getDataSrc from '../common/getDataSrc.js'

export default function(props) {/*updateLocation, dataSrc*/
  var cont;
  getDataSrc(props.dataSrc, r => {

  });
  return (
    <div className="team__users-tree" ref={ r => cont = r }></div>
  );
}
