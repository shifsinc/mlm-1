import React from 'react';
import './History.css'
import Table from '../../common/Table.js'
import { formatDate } from '../../../utils.js'

export default function(props){/*data*/
  var data = props.data ? props.data : [];
  return (
    <Table titles={ [ 'СУММА', 'ОПИСАНИЕ', 'ДАТА', 'СТАТУС' ] }>
      {
        data.map((d, i) => {
          return (<tr key={ i }>
            <td>{ d.tr_platform_amount + ' YT' }</td>
            <td>{ d.tr_descr }</td>
            <td>{ formatDate( d.tr_dt ) }</td>
            <td><div className={ 'transaction-status-' + d.tr_status }></div></td>
          </tr>);
        })
      }
    </Table>
  );
}
