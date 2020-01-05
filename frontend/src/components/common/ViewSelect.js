import React from 'react';

export default function(props){/*active*/
  var ind = parseInt( props.active );
  if( isNaN(ind) ) return (<></>);
  else return Array.isArray( props.children ) ? props.children[ ind ] : props.children;
}
