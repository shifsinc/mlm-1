import React from 'react';
import './History.css'
import '../common/common.css'

import Table from '../../common/Table.js'
import { formatDate } from '../../../utils.js'
import { TRANSACTION_TITLES } from '../../../const.js'

export default function(props){/*data*/
  var data = props.data ? props.data : [];
  return (
    <Table titles={ [ 'СУММА', 'ОПИСАНИЕ', 'ДАТА', 'СТАТУС' ] }>
      {
        data.map((d, i) => {
          return (<tr key={ i }>
            <td>{ d.tr_platform_amount + ' YT' }</td>
            <td>{ TRANSACTION_TITLES[ d.tr_type ] }</td>
            <td>{ formatDate( d.tr_dt ) }</td>
            <td><div className={ 'transaction-status-' + d.tr_status }></div></td>
          </tr>);
        })
      }
    </Table>
  );
}
