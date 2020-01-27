import React from 'react';
import './Hint.css';

export default function({ children, className, position, size }){/**/
  if( !position ) position = 'bottom';
  if( !size ) size = 'sm';
  var cn = ['hint'];
  cn.push(position);
  cn.push(size);
  if( className ) cn.push(className);
  return (<div className={ cn.join(' ') }>
      <div className="hint__button"></div>
      <div className="hint__text">{ children }</div>
    </div>);
}
