import React from 'react';
import './Stats.css'

export default function(props){/*data*/
  var data = props.data ? props.data : {};
  return (
    <div className="interface-block team__stats">
      <div className="team__stats__item">
        <span>Пользователей в обеих линиях</span><span>{ data.bothLinesUsers }</span>
      </div>
      <div className="team__stats__item">
        <span>Бинарных пользователей</span><span>{ data.binaryUsers }</span>
      </div>
      <div className="team__stats__item">
        <span>Рефералов в левой/правой ноге</span><span>{ data.referals }</span>
      </div>
      <div className="team__stats__item">
        <span>YT в левой/правой ноге</span><span>{ data.money }</span>
      </div>
    </div>
  );
}

/*{
  bothLinesUsers: '92',
  binaryUsers: '76',
  referals: '29/47',
  money: '0/21250'
}*/
