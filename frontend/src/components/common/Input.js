import React from 'react';
import './Input.css';
import Hint from './Hint.js'

export default function(props){/*regexp, className, attr, label, required, startValue*/
  const _onBlur = e => {
    var targ = e.target, regexp = props.regexp;
    if( props.regexp ){
      if( !Array.isArray( regexp ) ) regexp = [ regexp ];

      var testResult = regexp.reduce((s,r) => r.test(targ.value) + s, 0);
      if( regexp.length && !testResult && targ.value ) targ.classList.add('incorrect');
      else targ.classList.remove('incorrect');
    }
  }
  const __onBlur = e => {
    _onBlur(e);
    if( props.attr && props.attr.onBlur ) props.attr.onBlur(e);
  }

  var cn = [ 'input' ];
  if( props.className ) cn.push( props.className );

  var inp, startValue = props.startValue ? props.startValue : null;
  if( props.textarea )
    inp = (<textarea ref={ r => r && startValue && (r.value = startValue) } {...props.attr} onBlur={ __onBlur }
      placeholder={ props.label }></textarea>);
  else inp = (<><input ref={ r => r && startValue && (r.value = startValue) } required {...props.attr} onBlur={ __onBlur }
      className={ props.required ? 'required': '' }/>
  <div className="input__label">{ props.label }</div></>);

  return (
    <div className= {cn.join(' ') }>
      <label>
        { inp }
        { props.children }
        { props.hint ? (
          <div className="input__button input__hint"><Hint size="sm" position="top">
            { props.hint }
          </Hint></div>
        ) : undefined }
      </label>
    </div>
  );
}
