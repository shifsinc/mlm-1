import React from 'react';
import './Input.css';

export default function(props){/*regexp, className, attr, label, buttonClick*/
  var _onBlur = e => {
    var targ = e.target, regexp = props.regexp;
    if( !Array.isArray( regexp ) ) regexp = [ regexp ];
    if( regexp[0] && !regexp.reduce((s,r) => r.test(targ.value) + s, 0) ) targ.classList.add('incorrect');
    else targ.classList.remove('incorrect');
  }
  return (
    <div className={ 'input' + (props.className ? ' ' + props.className : '') }>
      <input required {...props.attr} onBlur={ _onBlur }/>
      <label className="input__label">{ props.label }</label>
      <div className="input__button" onClick={ props.buttonClick ? props.buttonClick : () => {} }></div>
      { props.children }
    </div>
  );
}
