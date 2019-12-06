import React from 'react';
import MenuView from './MenuView.js'
import AccountView from './AccountView.js'

function MainView(props) {/*updateLocation, action*/
  var view;
  switch( props.action ){
    case '/account':
      view = <AccountView updateLocation={ props.updateLocation }></AccountView>
      break;
  }
  return (
    <div>
      <MenuView action={ props.action }></MenuView>
      { view }
    </div>
  );
}

export default MainView;
