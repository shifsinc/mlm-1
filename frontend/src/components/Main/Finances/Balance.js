import React from 'react';
import './Balance.css'
import Link from '../../common/Link.js'

export default function(props){/*data, refillClick, transferClick*/
  var data = props.data ? props.data : {};
  return (
    <div className="interface-block finances__balance">
      <div className="finances__balance__label">Текущий баланс YT</div>
      <div className="finances__balance__value">{ data.account_balance }</div>
      <div className="finances__balance__cont">
        <Link className="button button_inactive finances__balance__button" onClick={ props.refillClick }>Пополнить кошелек</Link>
        <Link className="button button_inactive finances__balance__button" onClick={ props.transferClick }>Перевести YT</Link>
      </div>
    </div>
  );
}
