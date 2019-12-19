import React from 'react';
import './Finances.css'
import Balance from './Finances/Balance.js'
import Bonuses from './Finances/Bonuses.js'
import OutMoney from './Finances/OutMoney.js'
import History from './Finances/History.js'

export default function(props) {/*updateLocation*/
  var data = props.apiCall('_').then(r => r.result ? r.result : {});
  return (
    <div className="main__content finances">
      <div className="finances__cont">
        <Balance dataSrc={ data }></Balance>
        <Bonuses dataSrc={ data }></Bonuses>
      </div>
      <OutMoney dataSrc={ data }></OutMoney>
      <History dataSrc={ data }></History>
    </div>
  );
}
