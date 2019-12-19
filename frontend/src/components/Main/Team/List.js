import React from 'react';
import './List.css'
import Table from '../../Table.js'
import getDataSrc from '../common/getDataSrc.js'

export default function(props) {/*updateLocation, dataSrc*/
  var cont;
  getDataSrc(props.dataSrc, r => {
    cont.innerHTML = `
    <tr><td>Имя пользователя</td><td>11.05.2019</td><td>LIGHT</td><td>Правая нога</td><td>Комадна</td></tr>
    <tr><td>Имя пользователя</td><td>16.03.2019</td><td>MASTER</td><td>Левая нога</td><td></td></tr>`;
  });
  return (
    <div className="interface-block team__list">
      <Table titles={ [ 'ИМЯ ФАМИЛИЯ', 'ЗАРЕГЕСТРИРОВАН', 'ТАРИФ', 'НАПРАВЛЕНИЕ', '' ] } contRef={ r => cont = r }></Table>
    </div>
  );
}
