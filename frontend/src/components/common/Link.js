import React from 'react';
import './Link.css';

export default function(props) {/*className, path, updateLocation, onClick, active, disabled*/
  var path = props.path ? props.path : '##';
  var className = [ 'link' ];
  if( props.active ) className.push( 'link_active' );
  if( props.disabled ) className.push( 'link_disabled' );
  if( props.className ) className.push( props.className );
  return (<a className={ className.join(' ') } href={ path }
        onClick={e => {
          e.preventDefault();
          if( props.disabled ) return;
          if(props.onClick) props.onClick(e);
          if(props.path) props.updateLocation( path );
        }}>{ props.children }</a>);
}
