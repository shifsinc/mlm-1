import React from 'react';
import MenuView from './MenuView.js'
import AccountView from './AccountView.js'

function MainView(props) {/*updateLocation, location*/
  var view;
  switch( props.location ){
    case '/account':
      view = <AccountView updateLocation={ props.updateLocation }></AccountView>
      break;
    default:
      
  }
  return (
    <div>
      <MenuView action={ props.location }></MenuView>
      { view }
    </div>
  );
}

export default MainView;
