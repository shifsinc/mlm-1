import React from 'react';
import './Main.css'
import Menu from './Menu.js'
import StartWorkWrapper from './StartWorkWrapper.js'

const VIEWS = {
	'/account': require('../Account.js').default,
	'/robot': require('../Robot.js').default,
	'/team': require('../Team.js').default,
	'/marketing': require('../Marketing.js').default,
	'/finances': require('../Finances.js').default,
	'/refill': require('../Finances.js').default,
	'/transfer': require('../Finances.js').default,
	'/instructions': require('../Instructions.js').default,
  '/settings': require('../Settings.js').default,
	'/admin': require('../Admin.js').default
}

export default function(props) {/*apiCall, location*/
  var View = VIEWS[ props.location ];
  return (
    <div className="main">
      <Menu { ...props } ></Menu>
      { ( props.location === '/team' || props.location === '/finances' ) ?
				<StartWorkWrapper apiCall={ props.apiCall } component={ View } componentProps={ props }></StartWorkWrapper> :
				<View { ...props }></View> }
    </div>
  );
}
