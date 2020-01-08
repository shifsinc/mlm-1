import React from 'react';
import './SelectInput.css';
import Input from './Input.js'

export default class extends React.Component {
  constructor(props){/*label, options, onSelect*/
    super(props);
    this.state = {
      selected: 0,
      optionsOpened: false
    }
  }

  selectOption = n => {
    this.props.onSelect(n);
    this.setState({ selected: n, optionsOpened: false });
  }

  render(){
    var options = this.props.options ? this.props.options : [], selected = this.state.selected;
    return (<div className={ 'select-input ' + ( this.state.optionsOpened ? 'opened' : '' ) }>
      <Input className="label-top" label={ this.props.label } attr={{
            readOnly: true,
            value: options[ selected ],
            onClick: () => this.setState({ optionsOpened: !this.state.optionsOpened })
          }}>
        <div className="select-input__button"><div></div></div>
      </Input>
      <div className="select-input__options interface-block">
        {
          options.map((opt, i) => {
            return (<div key={ i } className={ 'select-input__options__item ' + ( selected === i ? 'active': '' ) }
              onClick={ () => this.selectOption(i) }>
              { opt }
            </div>);
          })
        }
      </div>
    </div>);
  }
}
