import React from 'react';
import './Balance.css'
import Link from '../../Link.js'

export default function(props){/*data*/
  var data = props.data ? props.data : {};
  return (
    <div className="interface-block finances__balance">
      <div className="finances__balance__label">Текущий баланс YT</div>
      <div className="finances__balance__value">{ data.account_balance }</div>
      <Link className="button finances__balance__button">Пополнить кошелек</Link>
      <Link className="button finances__balance__button">Перевести YT</Link>
    </div>
  );
}
