import React from 'react';
import './MoneyFormContainer.css'

export default function(props){/*info*/
  return (<div>
    <div className="interface-block money-form-container__main">
      { props.children }
    </div>
    <div className="money-form-container__info">
      { props.info }
    </div>
  </div>);
}
