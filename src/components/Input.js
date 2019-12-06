import React from 'react';
import './Input.css';

function Input(props) {/*attr, label*/
  return (
    <div className="input">
      <input required {...props.attr}/>
      <label className="input__label">{ props.label }</label>
    </div>
  );
}

export default Input;
