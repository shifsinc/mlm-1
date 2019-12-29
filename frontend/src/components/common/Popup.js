import React from 'react';
import './Popup.css'

export default function(props){/*className, display, onClose*/
  var cover;
  return (
    <div className="cover popup__cover" ref={ r => cover = r }
      onClick={ e => { if(e.target === cover) props.onClose() } }
      style={{ display: props.display ? '' : 'none' }}>
      <div className={ 'interface-block popup ' + (props.className ? props.className : '') }>
        <div className="popup__close" onClick={ () => props.onClose() }></div>
        { props.children }
      </div>
    </div>
  );
}
