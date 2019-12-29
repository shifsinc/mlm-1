import React from 'react';
import './SecondStep.css'
import Link from '../../../common/Link.js'
import PurchaseRobot from '../PurchaseRobot.js'

export default function(props){/*data, updateLocation, apiCall, _next*/
  //var data = props.data ? props.data : {};
  return (
    <div className="start-work__second-step">
      <PurchaseRobot updateLocation={ props.updateLocation }
        apiCall={ props.apiCall } noMoneyCallback={ () => props._next() }></PurchaseRobot>
      <Link className="button button_inactive start-work__button"
        onClick={ () => {} }>Пропустить</Link>
      <Link className="button start-work__button start-work__save-button"
        onClick={ () => {} }>Сохранить</Link>
    </div>
  );
}
