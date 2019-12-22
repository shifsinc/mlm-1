import React from 'react';
import './News.css'

export default function(props){/*data*/
  var data = props.data ? props.data : [];
  return (
    <div className="account__news__cont">
      {
        data.map((d, i) => {
          var date = new Date( d.news_dt );

          return (<div key={ i } className="account__news__item">
            <div className="account__news__item__text">{ d.news_text }</div>
            <div className="account__news__item__date">
              { date.getDate() + '.' + date.getMonth() + '.' + (date.getYear()+1900) }
            </div>
          </div>);

        })
      }
    </div>
  );
}
