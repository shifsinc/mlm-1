import React from 'react';
import './List.css'
import Table from '../../Table.js'

export default function(props){/*data*/
  var data = props.data ? props.data : [];
  return (
    <Table titles={ [ 'ИМЯ ФАМИЛИЯ', 'ЗАРЕГЕСТРИРОВАН', 'ТАРИФ', 'НАПРАВЛЕНИЕ', '' ] }>
      {
        data.map((d, i) => {
          return (<tr key={ i }>
            <td>{ d.user_name + ' ' + d.user_surname }</td>
            <td>{ d.user_dt }</td>
            <td>{ d.user_rate }</td>
            <td>{ d.user_type === 'l' ? 'Левая нога' : 'Правая нога' }</td>
            <td>{ d.user_is_team ? 'Команда' : '' }</td>
          </tr>);
        })
      }
    </Table>
  );
}

/*{
  user_name: 'Имя пользователя',
  user_surname: '',
  user_dt: '11.05.2019',
  user_rate: 'LIGHT',
  user_type: 'l',
  user_is_team: false
},
{
  user_name: 'Имя пользователя',
  user_surname: '',
  user_dt: '11.06.2019',
  user_rate: 'MASTER',
  user_type: 'l',
  user_is_team: true
}*/
