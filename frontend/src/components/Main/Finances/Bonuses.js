import React from 'react';
import './Bonuses.css'

const ITEMS = [
  { label: 'Линейный бонус', field: 'bonus_linear' },
  { label: 'Бинарный бонус', field: 'bonus_binary' },
  { label: 'Match-бонус', field: 'bonus_match' },
  { label: 'Лидерский бонус', field: 'bonus_lead' },
  { label: 'Extra-бонус', field: 'bonus_extra' },
  { label: 'Списания', field: 'account_withdraws' }
]

export default function(props){/*data*/
  var data = props.data ? props.data : {};
  return (
    <div className="finances__bonuses">
      {
        ITEMS.map((item, i) => {
          var val = data[ item.field ] ? data[ item.field ] : 0;
          return (<div key={ i } className="interface-block finances__bonuses__item">
            <div className="finances__bonuses__item__label">{ item.label }</div>
            <div className="finances__bonuses__item__value">{ val.toFixed(1) } YT</div>
          </div>);
        })
      }
    </div>
  );
}
