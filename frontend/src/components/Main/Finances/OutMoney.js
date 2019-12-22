import React from 'react';
import './OutMoney.css'
import Input from '../../Input.js'

export default function(props) {
  return (
    <div className="interface-block finances__out-money">
      <Input label="Вывод средств"></Input>
      <span className="finances__out-money__comission">-2% = 111</span>
    </div>
  );
}
