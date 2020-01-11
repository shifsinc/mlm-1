import React from 'react';
import './Bonuses.css'

export default function(props){/*data*/
  var data = props.data ? props.data : {};
  return (
    <div className="finances__bonuses">
      <div className="interface-block finances__bonuses__item">
        <div className="finances__bonuses__item__label">Линейный бонус</div>
        <div className="finances__bonuses__item__value">{ data.bonus_linear } YT</div>
      </div>
      <div className="interface-block finances__bonuses__item">
        <div className="finances__bonuses__item__label">Бинарный бонус</div>
        <div className="finances__bonuses__item__value">{ data.bonus_binary } YT</div>
      </div>
      <div className="interface-block finances__bonuses__item">
        <div className="finances__bonuses__item__label">Match-бонус</div>
        <div className="finances__bonuses__item__value">{ data.bonus_match } YT</div>
      </div>
      <div className="interface-block finances__bonuses__item">
        <div className="finances__bonuses__item__label">Лидерский бонус</div>
        <div className="finances__bonuses__item__value">{ data.bonus_lead } YT</div>
      </div>
      <div className="interface-block finances__bonuses__item">
        <div className="finances__bonuses__item__label">Extra-бонус</div>
        <div className="finances__bonuses__item__value">{ data.bonus_extra } YT</div>
      </div>
      <div className="interface-block finances__bonuses__item">
        <div className="finances__bonuses__item__label">Списания</div>
        <div className="finances__bonuses__item__value">{ data.account_withdraws } YT</div>
      </div>
    </div>
  );
}
