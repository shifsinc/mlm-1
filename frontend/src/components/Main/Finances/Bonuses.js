import React from 'react';
import './Bonuses.css'

export default function(props){/*data*/
  var data = props.data ? props.data : {};
  return (
    <div className="finances__bonuses">
      <div className="interface-block finances__bonuses__item">
        <div>Линейный бонус</div>
        <div>{ data.bonus_linear }</div>
      </div>
      <div className="interface-block finances__bonuses__item">
        <div>Бинарный бонус</div>
        <div>{ data.bonus_binary }</div>
      </div>
      <div className="interface-block finances__bonuses__item">
        <div>Match-бонус</div>
        <div>{ data.bonus_match }</div>
      </div>
      <div className="interface-block finances__bonuses__item">
        <div>Лидерский бонус</div>
        <div>{ data.bonus_lead }</div>
      </div>
      <div className="interface-block finances__bonuses__item">
        <div>Extra-бонус</div>
        <div>{ data.bonus_extra }</div>
      </div>
      <div className="interface-block finances__bonuses__item">
        <div>Списания</div>
        <div>{ data.account_withdraws }</div>
      </div>
    </div>
  );
}

/*{
  binary: '2035 YT',
  match: '181 YT',
  yoda: '150 YT',
  linear1: '2802 YT',
  linear2: '912 YT',
  withdraw: '2453 YT'
}*/
