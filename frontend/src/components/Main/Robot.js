import React from 'react';
import './Robot.css'
import Keys from './Robot/Keys.js'
import RobotUpdates from './common/RobotUpdates.js'
import PurchaseRobot from './common/PurchaseRobot.js'
import TitleBlock from './common/TitleBlock.js'
import PageView from '../common/PageView.js'
import FilesView from './common/FilesView.js'

export default class extends React.Component {
  constructor(props){/*updateLocation, apiCall*/
    super(props);
    this.state = { info: {} };

    props.apiCall('getUserInfo').then( r => this.setState({ info: r.result }) );
  }

  render(){
    return (<div className="main__content robot">

        <TitleBlock title="Ключи" className="robot__keys">
          <PageView callback={ p => this.props.apiCall('getUserRobotKeys', p) }
            callbackArgs={{ rate: this.state.info.user_rate, rand: this.state.rand }} onPageCount={ 5 }
            component={ Keys } componentProps={{
              apiCall: this.props.apiCall,
              onChange: () => this.setState({ rand: Math.random() })
            }} >
          </PageView>
        </TitleBlock>

        <div className="robot__cont">

          <TitleBlock className="files-view robot__files">
            <PageView callback={ p => this.props.apiCall('getFiles', { section: 'robot', ...p }) }
              component={ FilesView } componentProps={{ className: 'robot__files' }} onPageCount={ 5 }></PageView>
          </TitleBlock>

          <TitleBlock title="Обновления" className="robot__updates">
            <PageView callback={ p => this.props.apiCall('getNews', { section: 'robot_update', ...p }) }
              component={ RobotUpdates } onPageCount={ 5 }></PageView>
          </TitleBlock>

        </div>

        <TitleBlock title="Покупка робота" className="robot__purchase">
          <PurchaseRobot updateLocation={ this.props.updateLocation } data={ this.state.info } apiCall={ this.props.apiCall }
            noMoneyCallback={ () => this.props.updateLocation('/refill') }
            okCallback={ rate => this.setState({ info: { ...this.state.info, user_rate: rate } }) }></PurchaseRobot>
        </TitleBlock>

      </div>)
  }
}
