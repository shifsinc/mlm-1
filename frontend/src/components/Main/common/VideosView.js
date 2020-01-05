import React from 'react';
import './VideosView.css'

export default function(props){/*data*/
  var data = props.data ? props.data : [];
  return (
    <div className="video-view">
    {
      data.map(d => {
        return (<video src={ d.file_url } controls="true"></video>);
      })
    }
    </div>
  );
}
