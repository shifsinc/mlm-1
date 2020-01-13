import React from 'react';
import './AttachFiles.css'

import Input from '../../../common/Input.js'

export default class extends React.Component {
  constructor(props){/*name, title, onChange*/
    super(props);
    this.state = {
      filename: null,
      count: null,
      title: null
    }
  }

  render(){
    return (<div className="admin__attach-files">
      <Input className="admin__attach-files__input" attr={{
          name: this.props.name,
          type: 'file',
          onChange: this._onChange,
          multiple: true,
          ref: r => this.input = r
        }}>
        <div title={ this.state.title ? this.state.title : null } className="button button_inactive admin__attach-files__button">
          { this.state.filename ? '(' + this.state.count + ') ' + this.state.filename : this.props.title }
        </div>

      </Input>
      <div className="admin__attach-files__delete" onClick={ this._deleteClick }></div>
    </div>);
  }

  _onChange = e => {
    var title = Array.prototype.reduce.call(e.target.files, (str, f) => str += f.name + '\n', '');
    this.setState({ filename: e.target.files[0].name, count: e.target.files.length, title });
  }

  _deleteClick = () => {
    this.input.value = '';
    this.setState({ filename: null, count: null, title: null });
  }

}
