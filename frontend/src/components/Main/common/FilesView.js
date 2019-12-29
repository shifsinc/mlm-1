import React from 'react';
import './FilesView.css'
import Table from '../../common/Table.js'

export default function(props){/*data*/
  var data = props.data ? props.data : [];
  return (
    <Table titles={ [ 'ФАЙЛ', 'ОПИСАНИЕ' ] } className="files-view" children=
      {
        data.map((d, i) => {
          return (<tr key={ i }>
            <td><a className="icon-before-text" target="_blank noopener noreferrer" href={ d.file_url }>{ d.file_type }</a></td>
            <td>{ d.file_descr }</td>
          </tr>);
        })
      }>
    </Table>
  );
}
