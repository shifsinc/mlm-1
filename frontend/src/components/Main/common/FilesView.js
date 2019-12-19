import React from 'react';
import './FilesView.css'
import Table from '../../Table.js'
import TitleBlock from '../common/TitleBlock.js'
import getDataSrc from '../common/getDataSrc.js'

export default function(props) {/*updateLocation, title, dataSrc, className*/
  var cont;
  getDataSrc(props.dataSrc, r => {
    r.forEach(f => {
      var tr = document.createElement('tr');
      tr.innerHTML = `<td><a target="_blank" href="` + f.file_url + `">` + f.file_type + `</a></td><td>` + f.file_descr + `</td>`;
      cont.appendChild(tr);
    });
  });
  return (
    <TitleBlock title={ props.title } className={ 'files-view' + (props.className ? ' ' + props.className : '') }>
      <Table titles={ [ 'ФАЙЛ', 'ОПИСАНИЕ' ] } contRef={ r => cont = r }></Table>
    </TitleBlock>
  );
}
