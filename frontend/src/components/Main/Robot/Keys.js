import React from 'react';
import './Keys.css'
import TitleBlock from '../common/TitleBlock.js'
import Table from '../../Table.js'
import getDataSrc from '../common/getDataSrc.js'

export default function(props) {/*updateLocation, dataSrc*/
  var cont;
  getDataSrc(props.dataSrc, r => {
    cont.innerHTML = `
    <tr><td class="icon-before-text">1050556</td><td>$ 50 000</td><td>Активна</td><td>17.11.2020 14:43</td></tr>`;
  });
  return (
    <TitleBlock title="Ключи" className="robot__keys">
      <Table titles={ [ 'НОМЕР СЧЕТА', 'МАКС. ДЕПОЗИТ', 'ЛИЦЕНЗИЯ', 'ДЕЙСТВИТЕЛЬНА ДО' ] } contRef={ r => cont = r }></Table>
    </TitleBlock>
  );
}
