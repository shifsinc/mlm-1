import React from 'react';
import './Start.css'
import Link from './Link.js';
import logo from '../img/logo.png'
import logo2x from '../img/logo@2x.png'

export default function(props){/*isSignedIn, updateLocation*/
  var buttonHref, buttonTitle;
  if( props.isSignedIn ){
    buttonHref = '/account';
    buttonTitle = 'ЛИЧНЫЙ КАБИНЕТ';
  } else {
    buttonHref = '/signup';
    buttonTitle = 'ПРИСОЕДИНИТЬСЯ';
  }
  return (
    <div id="start" className="vertical-center__cont" ref={r => r ? r.parentNode.classList.add('vertical-center') : null}>
      <img className="start__logo" src={ logo } srcSet={ logo2x + ' 2x' } alt="Logo"/>
      <Link
        className="button start__join-button"
        title={ buttonTitle }
        path={ buttonHref }
        updateLocation={ props.updateLocation }>
      </Link>
    </div>
  );
}
