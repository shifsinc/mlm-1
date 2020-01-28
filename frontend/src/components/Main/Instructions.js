import React from 'react';
import './Instructions.css'
import FilesView from './common/FilesView.js'
import TitleBlock from './common/TitleBlock.js'
import PageView from '../common/PageView.js'
import VideosView from './common/VideosView.js'

export default class extends React.Component {
  render(){/*apiCall*/
    return (
      <div className="main__content">
        <TitleBlock title="Инструкции">
          <PageView callback={ p => this.props.apiCall('getFiles', { section: 'instructions', ...p }) }
            component={ FilesView }  onPageCount={ 5 }></PageView>
        </TitleBlock>
        <div className="interface-block">
          <PageView callback={ p => this.props.apiCall('getFiles', { section: 'videos', ...p }) } component={ VideosView }  onPageCount={ 4 }></PageView>
        </div>
      </div>
    );
  }
}
