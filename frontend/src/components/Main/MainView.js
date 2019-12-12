import React from 'react';
import './MainView.css'
import MenuView from './MenuView.js'

const VIEWS = {
	'/account': require('./AccountView.js').default,
	'/robot': require('./RobotView.js').default,
	'/team': require('./TeamView.js').default,
	'/marketing': require('./MarketingView.js').default,
	'/finance': require('./FinanceView.js').default,
	'/instructions': require('./InstructionsView.js').default,
  '/settings': require('./SettingsView.js').default
}

export default function(props) {/*updateLocation, location*/
  var View = VIEWS[ props.location ];
  return (
    <div className="main-view">
      <div className="main-view__menu">
        <MenuView { ...props } ></MenuView>
      </div>
      <div className="main-view__content">
        <View { ...props }></View>
      </div>
    </div>
  );
}
