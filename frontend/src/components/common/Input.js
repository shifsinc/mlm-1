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
      <label>
        <input required {...props.attr} onBlur={ e => {
            _onBlur(e);
            if( props.attr && props.attr.onBlur ) props.attr.onBlur(e);
          } }/>
        <div className="input__label">{ props.label }</div>
        <div className="input__button" onClick={ props.buttonClick ? props.buttonClick : () => {} }></div>
        { props.children }
      </label>
    </div>
  );
}
