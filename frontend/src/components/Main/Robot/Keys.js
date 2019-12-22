import React from 'react';
import './Keys.css'
import Table from '../../Table.js'

export default function(props){/*data*/
  var data = props.data ? props.data : [];
  return (
    <Table titles={ [ 'НОМЕР СЧЕТА', 'МАКС. ДЕПОЗИТ', 'ЛИЦЕНЗИЯ', 'ДЕЙСТВИТЕЛЬНА ДО' ] }>
      {
        data.map((d, i) => {
          return (<tr key={ i }>
            <td className="icon-before-text">{ d.account }</td>
            <td>{ d.deposit }</td>
            <td>{ d.license ? 'Активна' : 'Не активна' }</td>
            <td>{ d.date }</td>
          </tr>);
        })
      }
    </Table>
  );
}

/*{
  account: '105056',
  deposit: '$ 50 000',
  license: true,
  date: '17.11.2020 14:43'
}*/
