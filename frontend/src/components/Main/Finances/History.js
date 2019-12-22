import React from 'react';
import './History.css'
import Table from '../../Table.js'

export default function(props){/*data*/
  var data = props.data ? props.data : [];
  return (
    <Table titles={ [ 'СУММА', 'ОПИСАНИЕ', 'ДАТА', 'СТАТУС' ] }>
      {
        data.map((d, i) => {
          return (<tr key={ i }>
            <td>{ d.tr_platform_amount + ' YT' }</td>
            <td>{ d.tr_descr }</td>
            <td>{ d.tr_dt }</td>
            <td>{ d.tr_status }</td>
          </tr>);
        })
      }
    </Table>
  );
}
