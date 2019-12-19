import React from 'react';
import './Bonuses.css'
import getDataSrc from '../common/getDataSrc.js'

export default function(props) {/*updateLocation, dataSrc*/
  var binary, match, yoda, linear1, linear2, withdraw;
  getDataSrc(props.dataSrc, r => {
    binary.innerHTML = '2035 YT';
    match.innerHTML = '181 YT';
    yoda.innerHTML = '150 YT';
    linear1.innerHTML = '2802 YT';
    linear2.innerHTML = '912 YT';
    withdraw.innerHTML = '2453 YT';
  });
  return (
    <div className="finances__bonuses">
      <div className="interface-block finances__bonuses__item">
        <div>Бинарный бонус</div>
        <div ref={ r => binary = r }></div>
      </div>
      <div className="interface-block finances__bonuses__item">
        <div>Match-бонус</div>
        <div ref={ r => match = r }></div>
      </div>
      <div className="interface-block finances__bonuses__item">
        <div>Yoda-бонус</div>
        <div ref={ r => yoda = r }></div>
      </div>
      <div className="interface-block finances__bonuses__item">
        <div>Линейный 1</div>
        <div ref={ r => linear1 = r }></div>
      </div>
      <div className="interface-block finances__bonuses__item">
        <div> Линейный 2</div>
        <div ref={ r => linear2 = r }></div>
      </div>
      <div className="interface-block finances__bonuses__item">
        <div>Списания</div>
        <div ref={ r => withdraw = r }></div>
      </div>
    </div>
  );
}
