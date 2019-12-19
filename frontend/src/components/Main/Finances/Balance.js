import React from 'react';
import './Balance.css'
import Link from '../../Link.js'
import getDataSrc from '../common/getDataSrc.js'

export default function(props) {/*updateLocation, dataSrc*/
  var cont;
  getDataSrc(props.dataSrc, r => {
    cont.innerHTML = '777';
  });
  return (
    <div className="interface-block finances__balance">
      <div className="finances__balance__label">Текущий баланс YT</div>
      <div className="finances__balance__value" ref={ r => cont = r }></div>
      <Link className="button finances__balance__button" path="##" updateLocation={ props.updateLocation }>Пополнить кошелек</Link>
      <Link className="button finances__balance__button" path="##" updateLocation={ props.updateLocation }>Перевести YT</Link>
    </div>
  );
}
