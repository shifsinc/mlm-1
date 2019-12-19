import React from 'react';
import './Keys.css'
import TitleBlock from '../common/TitleBlock.js'
import Table from '../../Table.js'
import getDataSrc from '../common/getDataSrc.js'

export default function(props) {/*updateLocation, dataSrc*/
  var cont;
  getDataSrc(props.dataSrc, r => {

  });
  return (
    <TitleBlock title="Ключи" className="robot__keys">
      <Table titles={ [ 'НОМЕР СЧЕТА', 'МАКС. ДЕПОЗИТ', 'ЛИЦЕНЗИЯ', 'ДЕЙСТВИТЕЛЬНА ДО' ] } contRef={ r => cont = r }></Table>
    </TitleBlock>
  );
}
