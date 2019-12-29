import React from 'react';
import './Updates.css'
import { formatDate } from '../../../utils.js'

export default function(props){/*data*/
  var data = props.data ? props.data : [];
  return (
    <div className="robot__updates__cont">
      {
        data.map((d, i) => {
          return (<div key={ i } className="robot__updates__item">
            <div>{ formatDate( d.news_dt ) }</div><div>{ d.news_text }</div>
          </div>);
        })
      }
    </div>
  );
}
