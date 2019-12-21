import React from 'react';
import './PageFooter.css'
import Link from './Link.js';
import facebookLogo from '../img/icon/facebook@2x.png'
import instagramLogo from '../img/icon/instagram@2x.png'
import telegramLogo from '../img/icon/telegram@2x.png'
import vkLogo from '../img/icon/vk@2x.png'

export default function(props){/*updateLocation*/
  return (
    <footer id="page-footer">
      <div className="page-footer__cont">
        <Link
        className="page-footer__terms"
        path="/terms"
        updateLocation={ props.updateLocation }>
        Пользовательское соглашение</Link>
        <div className="page-footer__label">YODAFX.PRO © 2019</div>
        <div className="page-footer__socials">
          <a href="##" target="_blank" rel="noopener noreferrer"><img src={ facebookLogo } alt="facebook"/></a>
          <a href="https://instagram.com/yodafxpro_offical" target="_blank" rel="noopener noreferrer">
            <img src={ instagramLogo } alt="inatagram"/>
          </a>
          <a href="https://t.me/yodafxstart" target="_blank" rel="noopener noreferrer"><img src={ telegramLogo } alt="telegram"/></a>
          <a href="##" target="_blank" rel="noopener noreferrer"><img src={ vkLogo } alt="vk"/></a>
        </div>
      </div>
    </footer>
  );
}
