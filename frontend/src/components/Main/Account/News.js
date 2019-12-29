import React from 'react';
import './News.css'
import { formatDate } from '../../../utils.js'

export default function(props){/*data*/
  var data = props.data ? props.data : [];
  return (
    <div className="account__news__cont">
      {
        data.map((d, i) => {
          return (<div key={ i } className="account__news__item">
            <div className="account__news__item__text">{ d.news_text }</div>
            <div className="account__news__item__date">
              { formatDate(new Date( d.news_dt ), false) }
            </div>
          </div>);
        })
      }
    </div>
  );
}
