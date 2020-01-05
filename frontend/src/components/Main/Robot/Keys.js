import React from 'react';
import './Keys.css'
import Table from '../../common/Table.js'
import { formatDate } from '../../../utils.js'

export default function(props){/*data*/
  var data = props.data ? props.data : [];
  return (
    <Table titles={ [ 'НОМЕР СЧЕТА', 'МАКС. ДЕПОЗИТ', 'ЛИЦЕНЗИЯ', 'ДЕЙСТВИТЕЛЬНА ДО' ] }>
      {
        data.map((d, i) => {
          return (<tr key={ i }>
            <td className="icon-before-text">{ d.key_account }</td>
            <td>{ '$ ' + d.key_max_deposit }</td>
            <td>{ ( new Date(d.key_valid_dt) - new Date() > 0 ) ? 'Активна' : 'Не активна' }</td>
            <td>{ formatDate( d.key_valid_dt ) }</td>
          </tr>);
        })
      }
    </Table>
  );
}
