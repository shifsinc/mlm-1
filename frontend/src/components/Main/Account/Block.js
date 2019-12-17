import React from 'react';
import './Block.css'

export default function(props) {/*updateLocation, title, className*/
  return (
    <div className={ 'account__block interface-block' + ( props.className ? ' ' + props.className : '' ) }>
      <h4>{ props.title }</h4>
      { props.children }
    </div>
  );
}
