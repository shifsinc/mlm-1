import React from 'react';
import './Popup.css'

export default function(props){/*className, onClose*/
  var cover;
  var onClose = () => props.onClose && props.onClose();
  return (
    <div className="cover popup__cover" ref={ r => cover = r }
      onClick={ e => { if( e.target === cover ) onClose() } }>
      <div className={ 'interface-block popup ' + (props.className ? props.className : '') }>
        <div className="popup__close" onClick={ onClose }></div>
        { props.children }
      </div>
    </div>
  );
}
