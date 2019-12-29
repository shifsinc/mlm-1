import React from 'react';
import './StartWork.css'
import StepView from '../../common/StepView.js'
import FirstStep from './StartWork/FirstStep.js'
import SecondStep from './StartWork/SecondStep.js'
import AddMoney from './AddMoney.js'

export default function(props) {/*apiCall, updateLocation*/
  return (
    <div className="main__content start-work">
      <StepView title="НАЧАЛО РАБОТЫ" stepTitles={ [ 'Подключение Ethereum', 'Покупка робота' ] }
        components={ [ FirstStep, SecondStep, AddMoney ] } componentsProps={ [ props, props, props ] }></StepView>
    </div>
  );
}
