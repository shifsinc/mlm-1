import React from 'react';
import './Input.css';
import Hint from './Hint.js'

export default function(props){/*regexp, className, attr, label, required*/
  var _onBlur = e => {
    var targ = e.target, regexp = props.regexp;
    if( props.regexp ){
      if( !Array.isArray( regexp ) ) regexp = [ regexp ];

      var testResult = regexp.reduce((s,r) => r.test(targ.value) + s, 0);
      if( regexp.length && !testResult && targ.value ) targ.classList.add('incorrect');
      else targ.classList.remove('incorrect');
    } else ;
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
        { props.hint ? (
          <div className="input__button input__hint"><Hint position="top">
            { props.hint }
          </Hint></div>
        ) : undefined }
      </label>
    </div>
  );
}
