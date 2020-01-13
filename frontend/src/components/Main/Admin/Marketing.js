import React from 'react';

import FilesEdit from './common/FilesEdit.js'

export default class extends React.Component {
  render(){/*apiCall*/
    return (<div className="admin__marketing interface-block admin__first-block">
      <h4>Файлы маркетинга</h4>
      <FilesEdit { ...this.props }  section="marketing"></FilesEdit>
    </div>);
  }

}
