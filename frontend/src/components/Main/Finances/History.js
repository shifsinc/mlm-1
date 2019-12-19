import React from 'react';
import './History.css'
import Table from '../../Table.js'
import TitleBlock from '../common/TitleBlock.js'
import getDataSrc from '../common/getDataSrc.js'

export default function(props) {/*updateLocation, dataSrc*/
  var cont;
  getDataSrc(props.dataSrc, r => {
    cont.innerHTML = `
    <tr><td>200 YT</td><td>Описание</td><td>03.07.2019 16:45</td><td></td></tr>`;
  });
  return (
    <TitleBlock title="История операций" className="finances__history">
      <Table titles={ [ 'СУММА', 'ОПИСАНИЕ', 'ДАТА', 'СТАТУС' ] } contRef={ r => cont = r }></Table>
    </TitleBlock>
  );
}
