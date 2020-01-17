import React from 'react';
import './Lines.css'
import Table from '../../common/Table.js'

export default function(props){/*data, lineClick, active*/
  var data = props.data ? props.data : {};
  return (
    <div className="interface-block team__lines">
      <Table titles={ [ 'РАСПРЕДЕЛЕНИЕ', 'ПОЛЬЗОВАТЕЛИ', 'АКТИВНЫЕ ПОЛЬЗОВАТЕЛИ' ] }>
        <tr className={ 'team__lines__line' + ( props.active === 1 ? ' active' : '' ) } onClick={ () => props.lineClick(1) }>
          <td>Первая линия</td><td>{ data.stats_first_line_referals }</td><td>{ data.stats_first_line_active_referals }</td>
        </tr>
        <tr className={ 'team__lines__line' + ( props.active === 2 ? ' active' : '' ) } onClick={ () => props.lineClick(2) }>
          <td>Вторая линия</td><td>{ data.stats_second_line_referals }</td><td>{ data.stats_second_line_active_referals }</td>
        </tr>
      </Table>
    </div>
  );
}
