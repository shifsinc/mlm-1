import React from 'react';
import './Admin.css'
import TabView from '../common/TabView.js'

import Users from './Admin/Users.js'
import Structure from './Admin/Structure.js'
import Events from './Admin/Events.js'
import Analytics from './Admin/Analytics.js'
import News from './Admin/News.js'
import Robot from './Admin/Robot.js'
import Instructions from './Admin/Instructions.js'
import Marketing from './Admin/Marketing.js'

export default class extends React.Component {
  constructor(props){/*apiCall*/
    super(props);
  }

  render(){
    return (
      <div className="main__content">
        <TabView className="admin"
          titles={[ 'Пользователи', 'Структура', 'События', 'Аналитика', 'Новости и блог', 'Робот', 'Инструкции', 'Маркетинг' ]}>
          <div><Users></Users></div>
          <div><Structure></Structure></div>
          <div><Events></Events></div>
          <div><Analytics></Analytics></div>
          <div><News></News></div>
          <div><Robot></Robot></div>
          <div><Instructions></Instructions></div>
          <div><Marketing></Marketing></div>
        </TabView>
      </div>
    );
  }
}
