import React from 'react';
import './Input.css';

export default function(props){
  var _onBlur = e => {
    if( props.regexp && !props.regexp.test( e.target.value ) ) e.target.classList.add('incorrect');
    else e.target.classList.remove('incorrect');
  }
  return (
    <div className={ 'input' + (props.className ? ' ' + props.className : '') }>
      <input required {...props.attr} onBlur={ _onBlur }/>
      <label className="input__label">{ props.label }</label>
    </div>
  );
}
