import React from 'react';
import './Switch.css'
import Link from '../Link.js'

export default function(props){/*location, updateLocation*/
  var location = props.location
  return (
    <div className="login-switch">
      <Link
        className={ location === '/signin' ? 'active' : '' }
        title="ВХОД"
        path="/signin"
        updateLocation={ props.updateLocation }>
      </Link>
      <Link
        className={ location === '/signup' ? 'active' : '' }
        title="РЕГИСТРАЦИЯ"
        path="/signup"
        updateLocation={ props.updateLocation }>
      </Link>
    </div>
  );
}
