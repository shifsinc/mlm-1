import React from 'react';
import './Hint.css';

export default function({ children, className, position }){/**/
  if( !position ) position = 'bottom';
  var cn = ['hint'];
  cn.push(position);
  if( className ) cn.push(className);
  return (<div className={ cn.join(' ') }>
      <div className="hint__button"></div>
      <div className="hint__text">{ children }</div>
    </div>);
}
