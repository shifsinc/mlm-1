import React from 'react';
import './PageHeader.css'
import Link from './Link.js'
import logo from '../img/logo_small.png'
import logo2x from '../img/logo_small@2x.png'

function PageHeader(props){/*isSignedIn, updateLocation*/
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
    <Link
      path='/'
      updateLocation={ props.updateLocation }>
      <img id="page-header__logo" src={ logo } srcSet={ logo2x + ' 2x' } alt="Logo"/>
    </Link>
      <Link
        className={ 'page-header__sign-in-button ' + buttonClass }
        title={ buttonTitle }
        path={ buttonHref }
        updateLocation={ props.updateLocation }>
      </Link>
    </header>
  );
}

export default PageHeader;
