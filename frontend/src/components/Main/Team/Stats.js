import React from 'react';
import './Stats.css'

export default function(props){/*data*/
  var data = props.data ? props.data : {};
  return (
    <div className="interface-block team__stats">
      <div className="team__stats__item">
        <span>Пользователей в обеих линиях</span><span>{ data.stats_first_line_referals + data.stats_second_line_referals + '' }</span>
      </div>
      <div className="team__stats__item">
        <span>Рефералов в левой/правой ноге</span><span>{ data.stats_left_referals + '/' + data.stats_right_referals }</span>
      </div>
      <div className="team__stats__item">
        <span>YT в левой/правой ноге</span><span>{ data.stats_yt_left + '/' + data.stats_yt_right }</span>
      </div>
    </div>
  );
}
