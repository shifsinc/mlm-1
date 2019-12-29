import React from 'react';
import StartWork from './StartWork.js'

export default class extends React.Component {
  constructor(props){/*apiCall, updateLocation, component, componentProps*/
    super(props);
    this.state = {
      component: null
    }

    props.apiCall('checkUserStartWork').then(r => {
      if( !r.result ) return;
      var component = r.result.user_start_work ? this.props.component : StartWork;
      this.setState({ component });
    });
  }

  render(){
    var Component = this.state.component;
    return Component ? <Component { ...this.props.componentProps }></Component> : <div></div>
  }
}
