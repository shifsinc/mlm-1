import React from 'react';
import './Switch.css'
import Link from '../Link.js'

export default function(props){/*action, updateLocation*/
  var action = props.action
  return (
    <div className="login-switch">
      <Link
        className={ action === '/signin' ? 'active' : '' }
        title="ВХОД"
        path="/signin"
        updateLocation={ props.updateLocation }>
      </Link>
      <Link
        className={ action === '/signup' ? 'active' : '' }
        title="РЕГИСТРАЦИЯ"
        path="/signup"
        updateLocation={ props.updateLocation }>
      </Link>
    </div>
  );
}
