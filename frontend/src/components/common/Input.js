import React from 'react';
import './Input.css';

export default function(props){/*regexp, className, attr, label, required*/
  var _onBlur = e => {
    var targ = e.target, regexp = props.regexp;
    if( !props.regexp ) return;
    if( !Array.isArray( regexp ) ) regexp = [ regexp ];

    var testResult = regexp.reduce((s,r) => r.test(targ.value) + s, 0);
    if( regexp.length && !testResult && targ.value ) targ.classList.add('incorrect');
    else targ.classList.remove('incorrect');
  }

  var cn = [ 'input' ];
  if( props.className ) cn.push( props.className );
  return (
    <div className= {cn.join(' ') }>
      <label>
        <input required {...props.attr} onBlur={ e => {
            _onBlur(e);
            if( props.attr && props.attr.onBlur ) props.attr.onBlur(e);
          } } className={ props.required ? 'required': '' }/>
        <div className="input__label">{ props.label }</div>
        { props.children }
      </label>
    </div>
  );
}
