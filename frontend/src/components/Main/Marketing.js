import React from 'react';
import './Marketing.css'
import FilesView from './common/FilesView.js'
import TitleBlock from './common/TitleBlock.js'
import PageView from '../PageView.js'

export default class extends React.Component {
  constructor(props){/*apiCall*/
    super(props);
  }

  render(){
    return (
      <div className="main__content">
        <TitleBlock title="Маркетинг">
          <PageView
            callback={ p => this.props.apiCall('getFiles', { section: 'marketing', ...p }).then(r => r.result ? r.result : []) }
            component={ FilesView }  onPageCount={ 5 }></PageView>
        </TitleBlock>
      </div>
    );
  }
}
