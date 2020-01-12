import React from 'react';
import './FilesView.css'
import Table from '../../common/Table.js'
import Link from '../../common/Link.js'
import '../Admin/common.css'

export default function(props){/*data, _admin, _deleteClick, _editClick*/
  var data = props.data ? props.data : [];
  var titles = [ 'ФАЙЛ', 'ОПИСАНИЕ' ];
  if( props._admin ) titles.push('');
  return (<Table titles={ titles } className="files-view" children=
      {
        data.map((d, i) => {
          return (<tr key={ i }>
            <td>
              <a className="icon-before-text" target="_blank noopener noreferrer" href={ d.file_url } download>{ d.file_type }</a>
            </td>
            <td>{ d.file_descr }</td>
            {
              props._admin ? (<td>
                  <Link className="admin__edit-button" onClick={ () => props._editClick(d) }></Link>
                  <Link className="admin__delete-button" onClick={ () => props._deleteClick(d) }></Link>
                </td>) : undefined
            }
          </tr>);
        })
      }>
    </Table>);
}
