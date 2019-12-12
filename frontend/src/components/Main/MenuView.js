import React from 'react';
import './MenuView.css'
import Link from '../Link.js'

export default function(props){/*updateLocation*/
  var commonProps = { updateLocation: props.updateLocation }, loc = props.location;
  return (
    <div id="menu-view" className="interface-block">
      <Link { ...commonProps } path="/account" title="Личный кабинет"
        className={ 'menu-view__item account-icon' + ( loc == '/account' ? ' active' : '' ) }></Link>
      <Link { ...commonProps } path="/robot" title="Мой робот"
        className={ 'menu-view__item robot-icon' + ( loc == '/robot' ? ' active' : '' ) }></Link>
      <Link { ...commonProps } path="/team" title="Моя команда"
        className={ 'menu-view__item team-icon' + ( loc == '/team' ? ' active' : '' ) }></Link>
      <Link { ...commonProps } path="/marketing" title="Маркетинг"
        className={ 'menu-view__item marketing-icon' + ( loc == '/marketing' ? ' active' : '' ) }></Link>
      <Link { ...commonProps } path="/finance" title="Финансы"
        className={ 'menu-view__item finance-icon' + ( loc == '/finance' ? ' active' : '' ) }></Link>
      <Link { ...commonProps } path="/instructions" title="Инструкции"
        className={ 'menu-view__item instructions-icon' + ( loc == '/instructions' ? ' active' : '' ) }></Link>
      <Link { ...commonProps } path="/settings" title="Настройки"
        className={ 'menu-view__item settings-icon' + ( loc == '/settings' ? ' active' : '' ) }></Link>
    </div>
  );
}
