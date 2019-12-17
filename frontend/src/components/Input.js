import React from 'react';
import './Input.css';

export default function(props){/*regexp, className, attr, label, buttonClassName, buttonClick*/
  var _onBlur = e => {
    var targ = e.target;
    if( targ.value && props.regexp && !props.regexp.test( targ.value ) ) targ.classList.add('incorrect');
    else targ.classList.remove('incorrect');
  }
  return (
    <div className={ 'input' + (props.className ? ' ' + props.className : '') }>
      <input required {...props.attr} onBlur={ _onBlur }/>
      <label className="input__label">{ props.label }</label>
      <div className={ 'input__button' + (props.buttonClassName ? ' ' + props.buttonClassName : '') }
        onClick={ props.buttonClick ? props.buttonClick : () => {} }></div>
    </div>
  );
}
