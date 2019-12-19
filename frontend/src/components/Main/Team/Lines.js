import React from 'react';
import './Lines.css'
import Table from '../../Table.js'
import getDataSrc from '../common/getDataSrc.js'

export default function(props) {/*updateLocation, dataSrc*/
  var cont;
  getDataSrc(props.dataSrc, r => {
    cont.innerHTML = `
    <tr><td>Первая линия</td><td>115</td><td>93</td></tr>
    <tr><td>Вторая линия</td><td>30</td><td>22</td></tr>`;
  });
  return (
    <div className="interface-block team__lines">
      <Table titles={ [ 'РАСПРЕДЕЛЕНИЕ', 'ПОЛЬЗОВАТЕЛИ', 'АКТИВНЫЕ ПОЛЬЗОВАТЕЛИ' ] } contRef={ r => cont = r }></Table>
    </div>
  );
}
