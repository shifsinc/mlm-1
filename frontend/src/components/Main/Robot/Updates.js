import React from 'react';
import './Updates.css'

export default function(props){/*data*/
  var data = props.data ? props.data : [];
  return (
    <div className="robot__updates__cont">
      {
        data.map((d, i) => {
          return (<div key={ i } className="robot__updates__item"><div>{ d.date }</div><div>{ d.text }</div></div>);
        })
      }
    </div>
  );
}

/*{
  date: '17.11.2019 15:14',
  text: 'Обновлено до версии 1.23'
},
{
  date: '18.12.2019 15:14',
  text: 'Обновлено до версии 1.26'
}*/
