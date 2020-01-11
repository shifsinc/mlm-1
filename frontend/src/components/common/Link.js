import React from 'react';
import './Link.css';

export default function(props) {/*className, path, updateLocation, onClick, active*/
  var path = props.path ? props.path : '##';
  var className = 'link';
  if( props.active ) className += ' link_active';
  if( props.className ) className += ' ' + props.className;
  return (<a className={ className } href={ path }
        onClick={e => {
          e.preventDefault();
          if(props.onClick) props.onClick(e);
          if(props.path) props.updateLocation( path );
        }}>{ props.children }</a>);
}
