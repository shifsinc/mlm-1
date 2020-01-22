import React from 'react';
import './History.css'
import '../common/common.css'

import Table from '../../common/Table.js'
import Link from '../../common/Link.js'
import { formatDate } from '../../../utils.js'
import { TRANSACTION_TITLES, PAY_METHOD_TITLES } from '../../../const.js'

export default function(props){/*data, userClick*/
  var data = props.data ? props.data : [];
  return (
    <Table titles={ [ 'СУММА', 'ОПИСАНИЕ', 'ДАТА', 'СТАТУС' ] }>
      {
        data.map((d, i) => {
          var descr = TRANSACTION_TITLES[ d.tr_type ];
          if( d.tr_type === 'internal' ){
            if( d._is_sender ){
              descr = <>{ descr + ' ПОЛЬЗОВАТЕЛЮ ' }
                <Link active onClick={ () => props.userClick(d.receiver_id) }>{ d.receiver_code }</Link></>
            } else {
              descr = <>{ descr + ' ОТ ПОЛЬЗОВАТЕЛЯ ' }
                <Link active onClick={ () => props.userClick(d.sender_id) }>{ d.sender_code }</Link></>
            }
          }
          if( d.tr_type === 'in' ){
            descr += ' (' + (d.tr_real_amount.toFixed(5) + ' ' + PAY_METHOD_TITLES[ d.tr_pay_method ] ) + ')';
          }
          return (<tr key={ i }>
            <td>{ d.tr_platform_amount + ' YT' }</td>
            <td>{ descr }</td>
            <td>{ formatDate( d.tr_dt ) }</td>
            <td><div className={ 'transaction-status-' + d.tr_status }></div></td>
          </tr>);
        })
      }
    </Table>
  );
}
