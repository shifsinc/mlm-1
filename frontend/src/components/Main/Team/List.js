import React from 'react';
import './List.css'
import Table from '../../common/Table.js'

export default function(props){/*data, userClick*/
  var data = props.data ? props.data : [];
  return (
    <Table titles={ [ 'ИМЯ ФАМИЛИЯ', 'ЗАРЕГЕСТРИРОВАН', 'ТАРИФ', 'НАПРАВЛЕНИЕ', '' ] }>
      {
        data.map((d, i) => {
          var date = new Date( d.user_dt );
          return (<tr key={ i }>
            <td onClick={ () => props.userClick(d) }>{ d.user_name + ' ' + d.user_surname }</td>
            <td>{ date.getDate() + '.' + date.getMonth() + '.' + ( date.getYear() + 1900 ) }</td>
            <td>{ d.user_rate ? d.user_rate.toUpperCase() : '-' }</td>
            <td>{ d.user_type === 'l' ? 'Левая нога' : 'Правая нога' }</td>
            <td>{  'Команда' }</td>
          </tr>);
        })
      }
    </Table>
  );
}
