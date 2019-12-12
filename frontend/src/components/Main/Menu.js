import React from 'react';
import './Menu.css'
import Link from '../Link.js'

export default function(props){/*updateLocation*/
  var commonProps = { updateLocation: props.updateLocation }, loc = props.location;
  return (
    <div id="menu" className="interface-block">
      <Link { ...commonProps } path="/account" title="Личный кабинет"
        className={ 'menu__item account-icon' + ( loc === '/account' ? ' active' : '' ) }></Link>
      <Link { ...commonProps } path="/robot" title="Мой робот"
        className={ 'menu__item robot-icon' + ( loc === '/robot' ? ' active' : '' ) }></Link>
      <Link { ...commonProps } path="/team" title="Моя команда"
        className={ 'menu__item team-icon' + ( loc === '/team' ? ' active' : '' ) }></Link>
      <Link { ...commonProps } path="/marketing" title="Маркетинг"
        className={ 'menu__item marketing-icon' + ( loc === '/marketing' ? ' active' : '' ) }></Link>
      <Link { ...commonProps } path="/finances" title="Финансы"
        className={ 'menu__item finances-icon' + ( loc === '/finances' ? ' active' : '' ) }></Link>
      <Link { ...commonProps } path="/instructions" title="Инструкции"
        className={ 'menu__item instructions-icon' + ( loc === '/instructions' ? ' active' : '' ) }></Link>
      <Link { ...commonProps } path="/settings" title="Настройки"
        className={ 'menu__item settings-icon' + ( loc === '/settings' ? ' active' : '' ) }></Link>
    </div>
  );
}
