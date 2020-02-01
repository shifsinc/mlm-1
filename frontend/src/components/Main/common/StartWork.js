import React from 'react';
import './StartWork.css'
import StepView from '../../common/StepView.js'
import FirstStep from './StartWork/FirstStep.js'
import SecondStep from './StartWork/SecondStep.js'
import AddMoney from './AddMoney.js'

export default class extends React.Component {
  constructor(props){/*apiCall, updateLocation*/
    super(props);
    this.state = {
      billingFilled: null
    }

    props.apiCall('getBilling').then(r => {
      if( !r.result ) return;
      this.setState({ billingFilled: r.result.account_ethereum !== null });
    });
  }

  render(){
    var { billingFilled } = this.state;
    return (<div className="main__content start-work">
      { billingFilled === null ? (<></>) : (
        <StepView title="НАЧАЛО РАБОТЫ" stepTitles={ [ 'Подключение Ethereum', 'Покупка робота' ] }
          startStep={ billingFilled ? 1 : 0 }
          components={ [ FirstStep, SecondStep, AddMoney ] } componentsProps={ [ this.props, this.props, this.props ] }></StepView>
      ) }
      </div>);
  }
}
