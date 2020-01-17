import React from 'react';
import './List.css'
import Table from '../../common/Table.js'
import Link from '../../common/Link.js'
import { RATES_TITLES } from '../../../const.js'
import { formatDate } from '../../../utils.js'

export default function(props){/*data, userClick*/
  var data = props.data ? props.data : [];
  return (
    <Table titles={ [ 'ИМЯ ФАМИЛИЯ', 'ЗАРЕГЕСТРИРОВАН','НОМЕР ТЕЛЕФОНА', 'ПОЧТА', 'ТАРИФ', 'НАПРАВЛЕНИЕ', '' ] }>
      {
        data.map((d, i) => {
          return (<tr key={ i }>
            <td><Link active onClick={ () => props.userClick(d) }>{ d.user_name } { d.user_surname }</Link></td>
            <td>{ formatDate( d.user_dt ) }</td>
            <td>{ d.user_phone }</td>
            <td>{ d.user_email }</td>
            <td>{ d.user_rate ? RATES_TITLES[ d.user_rate ] : '-' }</td>
            <td>{ d._user_direction === 'l' ? 'Левая нога' : 'Правая нога' }</td>
            <td>{  d._is_team ? 'Команда' : '' }</td>
          </tr>);
        })
      }
    </Table>
  );
}
