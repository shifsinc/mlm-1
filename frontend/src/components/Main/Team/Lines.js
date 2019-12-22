import React from 'react';
import './Lines.css'
import Table from '../../Table.js'

export default function(props){/*data*/
  var data = props.data ? props.data : {};
  return (
    <div className="interface-block team__lines">
      <Table titles={ [ 'РАСПРЕДЕЛЕНИЕ', 'ПОЛЬЗОВАТЕЛИ', 'АКТИВНЫЕ ПОЛЬЗОВАТЕЛИ' ] }>
        <tr><td>Первая линия</td><td>{ data.firstLineTotal }</td><td>{ data.firstLineActive }</td></tr>
        <tr><td>Вторая линия</td><td>{ data.secondLineTotal }</td><td>{ data.secondLineActive }</td></tr>
      </Table>
    </div>
  );
}

/*firstLineTotal: 115,
firstLineActive: 93,
secondLineTotal: 30,
secondLineActive: 22*/
