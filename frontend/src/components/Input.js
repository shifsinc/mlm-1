import React from 'react';
import './Input.css';

export default class extends React.Component {
  constructor(props) {/*attr, label, className, regexp*/
    super();
    this.state = {
      value: ''
    };
  }
  render(){
    var props = this.props;
    return (
      <div className={ 'input' + (props.className ? ' ' + props.className : '') }>
        <input required {...props.attr} value={ this.state.value } onChange={ this._onChange } onBlur={ this._onBlur }/>
        <label className="input__label">{ props.label }</label>
      </div>
    );
  }

  _onChange = e => {
    this.setState({ value: e.target.value });
  }

  _onBlur = e => {
    if( this.props.regexp && !this.props.regexp.test( e.target.value ) ) e.target.classList.add('incorrect');
    else e.target.classList.remove('incorrect');
  }
}
