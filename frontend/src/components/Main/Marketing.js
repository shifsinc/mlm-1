import React from 'react';
import './Marketing.css'
import FilesView from './common/FilesView.js'
import TitleBlock from './common/TitleBlock.js'
import PageView from '../common/PageView.js'

export default class extends React.Component {/*apiCall*/
  render(){
    return (
      <div className="main__content">
        <TitleBlock title="Маркетинг">
          <PageView callback={ p => this.props.apiCall('getFiles', { section: 'marketing', ...p }) }
            component={ FilesView }  onPageCount={ 5 }></PageView>
        </TitleBlock>
      </div>
    );
  }
}
