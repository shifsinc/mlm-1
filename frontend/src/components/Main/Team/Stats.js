import React from 'react';
import './Stats.css'
import getDataSrc from '../common/getDataSrc.js'

export default function(props) {/*updateLocation, dataSrc*/
  var bothLines, binaryUsers, referals, moneyAmount;
  getDataSrc(props.dataSrc, r => {
    bothLines.innerHTML = '92';
    binaryUsers.innerHTML = '76';
    referals.innerHTML = '29/47';
    moneyAmount.innerHTML = '0/21250';
  });
  return (
    <div className="interface-block team__stats">
      <div className="team__stats__item">
        <span>Пользователей в обеих линиях</span><span ref={ r => bothLines = r }></span>
      </div>
      <div className="team__stats__item">
        <span>Бинарных пользователей</span><span ref={ r => binaryUsers = r }></span>
      </div>
      <div className="team__stats__item">
        <span>Рефералов в левой/правой ноге</span><span ref={ r => referals = r }></span>
      </div>
      <div className="team__stats__item">
        <span>Количество YT, заработанное в левой/правой ноге</span><span ref={ r => moneyAmount = r }></span>
      </div>
    </div>
  );
}
