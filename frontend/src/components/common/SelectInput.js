import React from 'react';
import './SelectInput.css';
import Input from './Input.js'

export default class extends React.Component {
  constructor(props){/*label, options, onSelect, name, startValue, className*/
    super(props);
    this.state = {
      selected: props.startValue ? props.startValue : 0,
      optionsOpened: false
    }
  }

  selectOption = n => {
    if( this.props.onSelect ) this.props.onSelect(n);
    this.setState({ selected: n, optionsOpened: false });
  }

  render(){
    var options = this.props.options ? this.props.options : [], selected = this.state.selected;
    return (<div className={
        'select-input ' + ( this.props.className ? this.props.className + ' ' : ''  ) + ( this.state.optionsOpened ? 'opened' : '' )
      }>
      <Input className="label-top" label={ this.props.label } attr={{
            name: this.props.name,
            readOnly: true,
            value: options[ selected ],
            onClick: () => this.setState({ optionsOpened: !this.state.optionsOpened }),
            onSelect: e => e.preventDefault()
          }}>
        <div className="select-input__button input__button"><div></div></div>
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
