import React from 'react';
import './StepView.css'

export default class extends React.Component {
  constructor(props){/*title, stepTitles, components, componentsProps*/
    super(props);
    this.state = {
      currentStep: 0
    }
  }

  next = () => {
    var next = this.state.currentStep + 1;
    if( next >= this.props.components.length ) return;
    this.setState({ currentStep: next });
  }
  prev = () => {
    var prev = this.state.currentStep + 1;
    if( prev < 0 ) return;
    this.setState({ currentStep: prev });
  }

  render(){
    var currentStep = this.state.currentStep,
      Component = this.props.components[ currentStep ],
      props = this.props.componentsProps[ currentStep ],
      stepTitle = this.props.stepTitles[ currentStep ],
      progress = ( currentStep + 1 ) / this.props.components.length;

    return (<div className="step-view">
      <div className="step-view__header interface-block">
        <h2 className="step-view__header__title">{ this.props.title }</h2>
        <div className="step-view__header__progress"><div style={{ width: progress * 100 + '%' }}></div></div>
      </div>
      <div className={ 'interface-block step-view__cont step-view_step' + currentStep }>
        { stepTitle ? (<div className="step-view__step-title">{ 'Шаг ' + (currentStep + 1) + ' - ' + stepTitle }</div>) : undefined }
        <Component _next={ this.next } _prev={ this.prev } { ...props }></Component>
      </div>
    </div>);
  }

}
