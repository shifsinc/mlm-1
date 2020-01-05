import React from 'react';
import './Menu.css'
import Link from '../../common/Link.js'

export default function(props){/*updateLocation, startWork*/
  var commonProps = { updateLocation: props.updateLocation }, loc = props.location, menu;
  return (
    <div>
    <div id="menu" className="interface-block main__menu close" ref={ r => menu = r } onClick={ e => menu.classList.add('close') }>
      <div className="main__menu__mobile" onClick={ e => {e.stopPropagation();menu.classList.remove('close')} }></div>
      <Link { ...commonProps } path="/account" className={ 'menu__item account-icon' + ( loc === '/account' ? ' active' : '' ) }>
        Личный кабинет</Link>
      <Link { ...commonProps } path="/robot"
        className={ 'menu__item robot-icon' + ( loc === '/robot' ? ' active' : '' ) }>
        Мой робот</Link>
      <Link { ...commonProps } path={ props.startWork ? '/team' : undefined  }
        className={ 'menu__item team-icon' + ( loc === '/team' ? ' active' : '' ) + ( !props.startWork ? ' inactive' : '' ) }>
        Моя команда</Link>
      <Link { ...commonProps } path="/marketing" className={ 'menu__item marketing-icon' + ( loc === '/marketing' ? ' active' : '' ) }>
        Маркетинг</Link>
      <Link { ...commonProps } path={ props.startWork ? '/finances' : undefined  }
        className={ 'menu__item finances-icon' + (( loc === '/finances' || loc === '/refill' || loc === '/transfer' ) ? ' active' : '') + ( !props.startWork ? ' inactive' : '' )
       }>
        Финансы</Link>
      <Link { ...commonProps } path="/instructions" className={ 'menu__item instructions-icon' + ( loc === '/instructions' ? ' active' : '' ) }>Инструкции</Link>
      <Link { ...commonProps } path="/blog" className={ 'menu__item blog-icon' + ( loc === '/blog' ? ' active' : '' ) }>
        Блог</Link>
      <Link { ...commonProps } path="/settings" className={ 'menu__item settings-icon' + ( loc === '/settings' ? ' active' : '' ) }>
        Настройки</Link>
        {
          props.admin ?
            <Link { ...commonProps } path="/admin" className={ 'menu__item admin-icon' + ( loc === '/admin' ? ' active' : '' ) }>
              Управление</Link>
              : undefined
        }
    </div>
    <div className="cover menu-mobile-cover" onClick={ e => menu.classList.add('close') }></div>
    </div>
  );
}
