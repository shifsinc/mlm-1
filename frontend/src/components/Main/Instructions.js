import React from 'react';
import './Instructions.css'
import FilesView from './common/FilesView.js'
import TitleBlock from './common/TitleBlock.js'
import PageView from '../PageView.js'

export default class extends React.Component {
  constructor(props){/*apiCall*/
    super(props);
    this.state = { files: [] };

    props.apiCall('getFiles', { section: 'instructions', offset: 0, count: 5 }).then( r => this.setState({ files: r.result.data }) );
  }

  render(){
    return (
      <div className="main__content">
        <TitleBlock title="Инструкции">
          <PageView
            callback={ p => this.props.apiCall('getFiles', { section: 'instructions', ...p }).then(r => r.result ? r.result : []) }
            component={ FilesView }  onPageCount={ 5 }></PageView>
        </TitleBlock>
        <div className="interface-block"></div>
      </div>
    );
  }
}
