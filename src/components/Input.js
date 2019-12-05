import React from 'react';
import './Input.css';

function Input(props) {/*type, name, label*/
  return (
    <div className="input">
      <input required name={ props.name } type={ props.type ? props.type : 'text' }/>
      <label className="input__label">{ props.label }</label>
    </div>
  );
}

export default Input;
