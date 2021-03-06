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
  render(){/*apiCall*/
    return (
      <div className="main__content">
        <TabView className="admin"
          tabs={[
            { title: 'Пользователи', name: 'users' },
            { title: 'Структура', name: 'structure' },
            { title: 'События', name: 'events' },
            { title: 'Аналитика', name: 'analytics' },
            { title: 'Новости и блог', name: 'news' },
            { title: 'Робот', name: 'robot' },
            { title: 'Инструкции', name: 'instructions' },
            { title: 'Маркетинг', name: 'marketing' },
          ]} { ...this.props }>
          <Users { ...this.props }></Users>
          <Structure { ...this.props }></Structure>
          <Events { ...this.props }></Events>
          <Analytics { ...this.props }></Analytics>
          <News { ...this.props }></News>
          <Robot { ...this.props }></Robot>
          <Instructions { ...this.props }></Instructions>
          <Marketing { ...this.props }></Marketing>
        </TabView>
      </div>
    );
  }
}
