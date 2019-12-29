import React from 'react';
import './Videos.css'

export default function(props){/*data*/
  var data = props.data ? props.data : [];
  return (
    <div className="interface-block instructions__video">
    {
      data.map(d => {
        return (<video src={ d.file_url } controls="true"></video>);
      })
    }
    </div>
  );
}
