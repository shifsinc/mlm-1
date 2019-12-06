import React from 'react';
import './Input.css';

function Input(props) {/*attr, label, className*/
  return (
    <div className={ 'input' + (props.className ? ' ' + props.className : '') }>
      <input required {...props.attr}/>
      <label className="input__label">{ props.label }</label>
    </div>
  );
}

export default Input;
