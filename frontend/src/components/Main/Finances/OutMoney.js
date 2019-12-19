import React from 'react';
import './OutMoney.css'
import Input from '../../Input.js'
import getDataSrc from '../common/getDataSrc.js'

export default function(props) {/*updateLocation, dataSrc*/
  var cont;
  getDataSrc(props.dataSrc, r => {

  });
  return (
    <div className="interface-block finances__out-money">
      <Input label="Вывод средств"></Input>
      <span className="finances__out-money__comission">-2% = 111</span>
    </div>
  );
}
