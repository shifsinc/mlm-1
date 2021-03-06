import React from 'react';
import './PageHeader.css'
import Link from './common/Link.js'
import logo from '../img/logo_small.png'
import logo2x from '../img/logo_small@2x.png'

export default function(props){/*isSignedIn, updateLocation*/
  var buttonHref, buttonTitle, buttonClass;
  if( props.isSignedIn ){
    buttonHref = '/signout';
    buttonTitle = 'ВЫЙТИ';
    buttonClass = 'button button_inactive';
  } else {
    buttonHref = '/signin';
    buttonTitle = 'ВОЙТИ';
    buttonClass = 'button';
  }
  return (
    <header id="page-header">
      <div className="page-header__cont">
        <Link
          path='/'
          updateLocation={ props.updateLocation }>
          <img id="page-header__logo" src={ logo } srcSet={ logo2x + ' 2x' } alt="Logo"/>
        </Link>
          <Link
            className={ 'page-header__sign-in-button ' + buttonClass }
            path={ buttonHref }
            updateLocation={ props.updateLocation }>
          { buttonTitle }</Link>
      </div>
    </header>
  );
}
