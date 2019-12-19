import React from 'react';
import './Team.css'
import Lines from './Team/Lines.js'
import Stats from './Team/Stats.js'
import List from './Team/List.js'
import Input from '../Input.js'
import UsersTree from './Team/UsersTree.js'

export default function(props) {/*updateLocation*/
  var stats = props.apiCall('getUserStats').then(r => r.result ? r.result : {});
  return (
    <div className="main__content team">
      <div className="team__flex-cont">
        <div className="team__cont">
          <div className="interface-block team__search"><Input label="Поиск..."></Input></div>
          <Lines dataSrc={ stats }></Lines>
        </div>
        <Stats dataSrc={ stats }></Stats>
      </div>
      <List dataSrc={ stats }></List>
      <UsersTree dataSrc={ props.apiCall('getReferalsTree').then(r => r.result ? r.result : {}) }></UsersTree>
    </div>
  );
}
