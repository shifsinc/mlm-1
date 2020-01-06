import React from 'react';
import './Switch.css'
import Link from '../common/Link.js'

export default function(props){/*location, updateLocation*/
  var location = props.location;
  return (
    <div className="login-switch">
      <Link className={ location === '/signin' ? 'active' : '' }
        path="/signin"
        updateLocation={ props.updateLocation }>
        ВХОД</Link>
      <Link className={ location === '/signup' ? 'active' : '' }
        path="/signup"
        updateLocation={ props.updateLocation }>
        РЕГИСТРАЦИЯ</Link>
    </div>
  );
}
