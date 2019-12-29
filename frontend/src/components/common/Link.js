import React from 'react';
import './Link.css';

export default function(props) {/*className, path, updateLocation, onClick*/
  var path = props.path ? props.path : '##';
  return (
    <a className={ 'link ' + (props.className ? props.className : '') } href={ path }
        onClick={e => {
          e.preventDefault();
          if(props.onClick) props.onClick(e);
          if(props.path) props.updateLocation( path );
        }}>{ props.children }</a>
  );
}
