import React from 'react';
import './Popup.css'

export default function(props){
  var cover;
  return (
    <div className={ 'cover' + ( props.className ? ' ' + props.className : '' ) } ref={ r => cover = r }
      onClick={ e => e.target === cover ? cover.style.display = 'none' : undefined }>
    { props.children }
    </div>
  );
}
