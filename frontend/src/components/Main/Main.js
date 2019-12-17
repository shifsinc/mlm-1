import React from 'react';
import './Main.css'
import Menu from './Menu.js'

const VIEWS = {
	'/account': require('./Account.js').default,
	'/robot': require('./Robot.js').default,
	'/team': require('./Team.js').default,
	'/marketing': require('./Marketing.js').default,
	'/finances': require('./Finances.js').default,
	'/instructions': require('./Instructions.js').default,
  '/settings': require('./Settings.js').default
}

export default function(props) {/*updateLocation, location*/
  var View = VIEWS[ props.location ];
  return (
    <div className="main">
      <Menu { ...props } ></Menu>
      <View { ...props }></View>
    </div>
  );
}
