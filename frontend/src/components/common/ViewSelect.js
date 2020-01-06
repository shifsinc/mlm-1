import React from 'react';

export default function(props){/*active*/
  var ind = parseInt( props.active );
  if( isNaN(ind) ) return (<></>);
  var views = Array.isArray( props.children ) ? props.children : [ props.children ];
  return views[ ind ] ? views[ ind ] : (<></>);
}
